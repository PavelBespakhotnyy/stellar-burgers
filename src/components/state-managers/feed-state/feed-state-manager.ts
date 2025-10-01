import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
export const fetchAllFeeds = createAsyncThunk<TOrdersData>(
  'feedState/fetchAll',
  getFeedsApi
);
interface FeedStateManager {
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

const initialFeedState: FeedStateManager = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};
const feedStateManager = createSlice({
  name: 'feedState',
  initialState: initialFeedState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(fetchAllFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.feed = action.payload;
      });
  },
  selectors: {
    getFeed: (state) => state.feed,
    getFeedOrders: (state) => state.feed.orders,
    getTotal: (state) => state.feed.total,
    getTotalToday: (state) => state.feed.totalToday,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});
export const {
  getFeed,
  getFeedOrders,
  getTotal,
  getTotalToday,
  getLoading,
  getError
} = feedStateManager.selectors;
export default feedStateManager.reducer;
