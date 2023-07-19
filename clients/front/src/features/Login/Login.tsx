import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { initialValues } from './constants/constants';
import usersApi from '@/app/redux/api/users/usersApi';
import { validationSchema } from './helpers/validation';
import { LoginForm } from './components/LoginForm/LoginForm';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useLoginMutation } from '@/app/redux/api/auth/authApi';
import { authActions } from '@/app/redux/slices/auth/auth.slice';
import { ILoginUserDto } from '@/app/redux/api/auth/authApi.types';
import styles from './Login.module.scss';
import { WithLoading } from '@/common/components';

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginQuery, { isLoading }] = useLoginMutation();

  const handleAuth = async (loginDto: ILoginUserDto): Promise<void> => {
    const loginData = await loginQuery(loginDto).unwrap();
    dispatch(authActions.login(loginData));
    dispatch(usersApi.util.upsertQueryData('currentUser', undefined, loginData.user));
    navigate('/');
  };

  return (
    <WithLoading isLoading={isLoading} className={styles.container}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAuth}>
        <LoginForm disabled={isLoading} />
      </Formik>
    </WithLoading>
  );
};
