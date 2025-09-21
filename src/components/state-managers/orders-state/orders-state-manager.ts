import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
export const fetchUserOrdersHistory = createAsyncThunk(
  'ordersState/fetchUserOrderHistory',
  getOrdersApi
);
export const fetchUserOrderByNumber = createAsyncThunk(
  'ordersState/fetchUserOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);
interface UserOrdersStateManager {
  orders: TOrder[];
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialOrdersState: UserOrdersStateManager = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null
};
const ordersStateManager = createSlice({
  name: 'ordersState',
  initialState: initialOrdersState,
  reducers: {
    setUserOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrdersHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchUserOrdersHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.currentOrder = null;
        state.error = null;
      })
      .addCase(fetchUserOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.currentOrder = null;
      })
      .addCase(fetchUserOrderByNumber.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.currentOrder = action.payload;
      });
  },
  selectors: {
    getUserOrders: (state) => state.orders,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getCurrentOrder: (state) => state.currentOrder
  }
});
export const { setUserOrders } = ordersStateManager.actions;
export const { getUserOrders, getLoading, getError, getCurrentOrder } =
  ordersStateManager.selectors;
export default ordersStateManager.reducer;
