import { ITestUser } from '@/app/redux/api/users/usersApi.types';
import { Icon } from '@/common/components';
import { FC } from 'react';
import styles from './TestUserItem.module.scss';

interface IProps {
  user: ITestUser;
  onClick?: (user: ITestUser) => void;
}

export const TestUserItem: FC<IProps> = (props): JSX.Element => {
  const { user, onClick } = props;
  const { login, first_name, last_name, email } = user;
  const fullName = `${first_name}${last_name ? ` ${last_name}` : ''}`;

  const handleClick = (): void => {
    onClick?.(user);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div>
        <Icon name="account" type="info" size="small" />
        <strong>{login}</strong>
      </div>
      <div>{fullName}</div>
      <div>{email}</div>
    </div>
  );
};
