import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientsStateReducer,
  burgerStateReducer,
  feedStateReducer,
  ordersStateReducer,
  userStateReducer
} from '../components/state-managers';
const mainReducer = combineReducers({
  ingredients: ingredientsStateReducer,
  burgerConstructor: burgerStateReducer,
  feed: feedStateReducer,
  orders: ordersStateReducer,
  user: userStateReducer
});
const applicationStore = configureStore({
  reducer: mainReducer,
  devTools: process.env.NODE_ENV !== 'production'
});
export type RootState = ReturnType<typeof mainReducer>;
export type AppDispatch = typeof applicationStore.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default applicationStore;
