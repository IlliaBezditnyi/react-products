import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productSlice from './slices/productSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
