import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  TIngredient,
  TOrder,
  TConstructorIngredient,
  TOrdersData
} from '@utils-types';
export const createBurgerOrder = createAsyncThunk(
  'burgerState/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);
interface BurgerStateManager {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
  isLoading: boolean;
}

const initialBurgerState: BurgerStateManager = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderError: null,
  isLoading: false
};
const burgerStateManager = createSlice({
  name: 'burgerState',
  initialState: initialBurgerState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    removeConstructorItem: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveItemUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
      }
    },
    moveItemDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
    },
    clearOrderData: (state) => initialBurgerState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBurgerOrder.pending, (state) => {
        state.orderError = null;
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(createBurgerOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
        state.isLoading = false;
      })
      .addCase(createBurgerOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = initialBurgerState.constructorItems;
        state.isLoading = false;
        state.orderError = null;
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderModalData: (state) => state.orderModalData,
    getOrderRequest: (state) => state.orderRequest,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.orderError
  }
});
export const {
  addConstructorItem,
  removeConstructorItem,
  clearOrderData,
  moveItemUp,
  moveItemDown
} = burgerStateManager.actions;
export const {
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  getLoading,
  getError
} = burgerStateManager.selectors;
export default burgerStateManager.reducer;
