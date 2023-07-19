import { combineReducers } from '@reduxjs/toolkit';
import authApi from './api/auth/authApi';
import categoryApi from './api/categories/categoriesApi';
import citiesApi from './api/cities/citiesApi';
import servicesApi from './api/services/servicesApi';
import usersApi from './api/users/usersApi';
import authSlice from './slices/auth/auth.slice';

const rootReducer = combineReducers({
  auth: authSlice,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [servicesApi.reducerPath]: servicesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [citiesApi.reducerPath]: citiesApi.reducer,
});

export default rootReducer;
/** Тип для редюсера. */
export type RootState = ReturnType<typeof rootReducer>;
