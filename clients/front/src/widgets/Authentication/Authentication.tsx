import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '@/common/components';
import { Login, Registration } from '@/features/index';
import { EFormtype, formTypeQueryKey } from './constants/constants';
import styles from './Authentication.module.scss';
import { useTranslation } from 'react-i18next';
import { TestUsers } from '@/features/TestUsers/TestUsers';

/** Виджет авторизации */
export const Authentication = (): JSX.Element => {
  const { t } = useTranslation(['Auth', 'Common']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formType = searchParams.get(formTypeQueryKey);

  const goToForm = (type: EFormtype) => (): void => {
    navigate({
      pathname: '/auth',
      search: `${formTypeQueryKey}=${type}`,
    });
  };

  const FormToggler = (): JSX.Element => (
    <div className={styles.formToggler}>
      {!!formType && formType !== EFormtype.Login && (
        <Button variant="link" onClick={goToForm(EFormtype.Login)}>
          <Icon name="account-check" type="info" size="large" />
          {t('Auth:Action.login')}
        </Button>
      )}
      {formType !== EFormtype.Registration && (
        <Button variant="link" onClick={goToForm(EFormtype.Registration)}>
          <Icon name="account-plus" type="info" size="large" />
          {t('Auth:Action.register')}
        </Button>
      )}
      {formType !== EFormtype.TestUsers && (
        <Button variant="link" onClick={goToForm(EFormtype.TestUsers)}>
          <Icon name="account-group" type="info" size="large" />
          {t('Auth:Action.test_users')}
        </Button>
      )}
    </div>
  );

  const CurrentForm = (): JSX.Element => {
    // TODO Нужер рефакторинг
    if (formType === EFormtype.Registration) {
      return <Registration />;
    }
    if (formType === EFormtype.TestUsers) {
      return <TestUsers />;
    }

    return <Login />;
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/">
          <Button variant="link">
            <Icon name="chevron-left" type="info" size="small" />
            {t('Common:Navigation.toHome')}
          </Button>
        </Link>
      </nav>
      <CurrentForm />
      <FormToggler />
    </div>
  );
};
