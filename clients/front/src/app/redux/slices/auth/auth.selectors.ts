import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../reducers';
import { IAuthState } from './auth.types';

/**
 * Базовый селектор для получения среза Auth.
 *
 * @param state Состояние стора.
 */
const selectAuth = (state: RootState): IAuthState => state.auth;

const selectCurrentUser = createSelector(selectAuth, (auth): IAuthState['currentUser'] => auth.currentUser);
const selectIsLogged = createSelector(selectAuth, (auth): IAuthState['isLogged'] => auth.isLogged);

export const authSelectors = { selectCurrentUser, selectIsLogged };
