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

export const rootReducer = combineReducers({
  ingredients: ingredientsStateReducer,
  burgerConstructor: burgerStateReducer,
  feed: feedStateReducer,
  orders: ordersStateReducer,
  user: userStateReducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
