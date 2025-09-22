import { RootState } from '../../services/store';
export const getUser = (state: RootState) => state.user.user;
export const getIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const getIsAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const getLoginUserRequest = (state: RootState) =>
  state.user.loginUserRequest;
export const getLoginUserError = (state: RootState) =>
  state.user.loginUserError;
export const getIngredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;
export const getIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const getConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;
export const getOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;
export const getOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;
export const getBurgerLoading = (state: RootState) =>
  state.burgerConstructor.isLoading;
export const getBurgerError = (state: RootState) =>
  state.burgerConstructor.orderError;
export const getUserOrders = (state: RootState) => state.orders.orders;
export const getCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const getOrdersLoading = (state: RootState) => state.orders.isLoading;
export const getOrdersError = (state: RootState) => state.orders.error;
export const getFeedOrders = (state: RootState) => state.feed.feed.orders;
export const getTotal = (state: RootState) => state.feed.feed.total;
export const getTotalToday = (state: RootState) => state.feed.feed.totalToday;
export const getFeedLoading = (state: RootState) => state.feed.isLoading;
export const getFeedError = (state: RootState) => state.feed.error;
