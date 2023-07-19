import { useGetCategoryListQuery } from '@/app/redux/api/categories/categoriesApi';
import { useCitiesListQuery } from '@/app/redux/api/cities/citiesApi';
import { useGetServicesListQuery } from '@/app/redux/api/services/servicesApi';
import { useCurrentUserQuery, useUsersListQuery } from '@/app/redux/api/users/usersApi';
import { Icon, WithLoading } from '@/common/components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.scss';

/** Корневой компонент. */
function Home(): JSX.Element {
  const { t } = useTranslation('HomePage');

  const { currentData: currentUser } = useCurrentUserQuery();
  const { data: categoryList, isLoading: isCategoriesLoad } = useGetCategoryListQuery();
  const { data: servicesList, isLoading: isServicesLoad } = useGetServicesListQuery();
  const { data: citiesList } = useCitiesListQuery();
  const { data: usersList } = useUsersListQuery();

  return (
    <>
      <div className={styles.welcome}>
        <h2>
          {t(`HomePage:${currentUser ? 'hello_user' : 'hello_default'}`, {
            userName: currentUser?.first_name,
            appName: 'Buzzy Bee',
          })}{' '}
          👋
        </h2>
        <Icon name="airballoon" type="error" filled />
        <Icon name="attachment" type="info" size="small" />
      </div>
      {!currentUser && (
        <>
          <Link to="/auth">
            <Icon name="account" filled />
            to auth
          </Link>
          <Link to="/auth/register">
            <Icon name="allergy" type="success" size="large" filled />
            to register
          </Link>
        </>
      )}
      <div style={{ display: 'flex' }}>
        <WithLoading
          isLoading={isCategoriesLoad}
          style={{ height: '420px', display: 'flex', flexDirection: 'column', width: '50%', margin: '0px 10px' }}
        >
          <h3 style={{ textAlign: 'center' }}>Категории получены через Api</h3>
          <span>нужна авторизация</span>
          <ul style={{ overflow: 'scroll', border: '1px solid silver', borderRadius: '4px' }}>
            {categoryList?.map((category) => (
              <li key={category.category_id}>
                <Icon name="format-list-bulleted-square" type="warning" size="small" />
                {category.name}
              </li>
            ))}
          </ul>
        </WithLoading>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: '0px 10px' }}>
          <h3 style={{ textAlign: 'center' }}>Услуги получены через Api</h3>
          <span>нужна авторизация</span>
          <ul style={{ maxHeight: '420px', overflow: 'scroll', border: '1px solid silver', borderRadius: '4px' }}>
            {isServicesLoad && <h4>...Loading</h4>}
            {servicesList?.map((s) => (
              <li key={s.service_id}>
                <Icon name="format-list-bulleted-triangle" type="info" size="small" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: '0px 10px' }}>
          <h3 style={{ textAlign: 'center' }}>Города</h3>
          <span>не требуют авторизации</span>
          <ul style={{ maxHeight: '420px', overflow: 'scroll', border: '1px solid silver', borderRadius: '4px' }}>
            {citiesList?.map((city) => (
              <li key={city.city_id}>
                <Icon name="format-list-numbered-rtl" type="warning" size="small" />
                {city.name}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: '0px 10px' }}>
          <h3 style={{ textAlign: 'center' }}>Зарегестрированные пользователи</h3>
          <span>авторизация не нужна</span>
          <ul style={{ maxHeight: '420px', overflow: 'scroll', border: '1px solid silver', borderRadius: '4px' }}>
            {usersList?.map((user) => (
              <li key={user.user_id}>
                <Icon name="format-list-group" type="warning" size="small" />
                <strong>{`${user.login}: `}</strong>
                {`${user.first_name} `}
                {`${user.last_name} `}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
