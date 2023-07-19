import { useLoginMutation, useLogoutMutation } from '@/app/redux/api/auth/authApi';
import usersApi, { useCurrentUserQuery, useTestUsersQuery } from '@/app/redux/api/users/usersApi';
import { ITestUser } from '@/app/redux/api/users/usersApi.types';
import { authActions } from '@/app/redux/slices/auth/auth.slice';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { TestUsersList } from '@/modules/index';
import { useNavigate } from 'react-router-dom';

export const TestUsers = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: usersList = [], isLoading: loadingUsers } = useTestUsersQuery();
  const { currentData: currentUser, isLoading: loadingCurrentUser } = useCurrentUserQuery();
  const [logoutQuery, { isLoading: loadingLogout }] = useLogoutMutation();
  const [loginQuery, { isLoading: loadingLogin }] = useLoginMutation();

  const isLoading = loadingUsers || loadingCurrentUser || loadingLogout || loadingLogin;

  const handleClick = async (user: ITestUser): Promise<void> => {
    const { login, password } = user;
    if (currentUser) {
      await logoutQuery();
    }
    dispatch(authActions.logout());
    const loginData = await loginQuery({ login, password }).unwrap();
    dispatch(authActions.login(loginData));
    dispatch(usersApi.util.upsertQueryData('currentUser', undefined, loginData.user));
    navigate('/');
  };

  return <TestUsersList isLoading={isLoading} users={usersList} onClick={handleClick} />;
};
