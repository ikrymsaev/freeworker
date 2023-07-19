import { useRegisterMutation } from '@/app/redux/api/auth/authApi';
import { useCitiesListQuery } from '@/app/redux/api/cities/citiesApi';
import { authActions } from '@/app/redux/slices/auth/auth.slice';
import { WithLoading } from '@/common/components';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';
import { initialValues } from './constants/constants';
import { TRegisterFormValues } from './helpers/validation';

import styles from './Registration.module.scss';

export const Registration = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: citiesList, isLoading: citiesLoading } = useCitiesListQuery();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const isLoading = citiesLoading || registerLoading;

  const handleSubmit = async (values: TRegisterFormValues): Promise<void> => {
    try {
      const registerData = await register(values).unwrap();
      dispatch(authActions.login(registerData));
      navigate('/');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <WithLoading isLoading={isLoading} className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <RegistrationForm disabled={isLoading} citiesList={citiesList} />
      </Formik>
    </WithLoading>
  );
};
