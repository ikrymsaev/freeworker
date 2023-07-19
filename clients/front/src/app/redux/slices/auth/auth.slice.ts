import { jwtService } from '@/services/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, TLoginPayload } from './auth.types';

const initialState: IAuthState = {
  isLogged: false,
  currentUser: null,
};

/** Срез стора для главной страницы. */
const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<TLoginPayload>) {
      const { access_token, user } = action.payload;
      jwtService.setToken(access_token);
      state.isLogged = true;
      state.currentUser = user;
    },
    logout(state) {
      jwtService.removeToken();
      state.isLogged = false;
      state.currentUser = null;
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
