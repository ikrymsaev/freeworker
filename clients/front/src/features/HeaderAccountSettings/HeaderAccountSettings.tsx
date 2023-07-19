import { useLogoutMutation } from '@/app/redux/api/auth/authApi';
import usersApi, { useCurrentUserQuery } from '@/app/redux/api/users/usersApi';
import { authActions } from '@/app/redux/slices/auth/auth.slice';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { LoginButton } from '@/modules/LoginButton/LoginButton';
import { useNavigate } from 'react-router-dom';

export const HeaderAccountSettings = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutQuery] = useLogoutMutation();
  const { currentData: currentUser } = useCurrentUserQuery();

  const handleLogout = async (): Promise<void> => {
    await logoutQuery();
    dispatch(authActions.logout());
    dispatch(usersApi.util.upsertQueryData('currentUser', undefined, null));
  };

  const handleLoginClick = (): void => {
    navigate('/auth');
  };

  return <LoginButton userData={currentUser} onClickEntry={handleLoginClick} onClickExit={handleLogout} />;
};
