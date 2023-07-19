import { FC } from 'react';
import { ITestUser } from '@/app/redux/api/users/usersApi.types';
import { WithLoading } from '@/common/components';
import { TestUserItem } from './components/TestUserItem/TestUserItem';
import styles from './TestUsersList.module.scss';

type TTestUsersListProps = {
  isLoading?: boolean;
  onClick?: (user: ITestUser) => void;
  users: ITestUser[];
};

export const TestUsersList: FC<TTestUsersListProps> = (props): JSX.Element => {
  const { isLoading, users, onClick } = props;

  return (
    <WithLoading isLoading={isLoading} className={styles.container}>
      {users?.map((user) => (
        <TestUserItem key={user.user_id} user={user} onClick={onClick} />
      ))}
    </WithLoading>
  );
};
