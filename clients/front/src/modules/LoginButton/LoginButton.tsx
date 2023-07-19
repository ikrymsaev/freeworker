import { IUser } from '@/app/redux/api/users/usersApi.types';
import { Icon } from '@/common/components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoginButton.module.scss';

interface IProps {
  userData?: IUser | null;
  onClickExit: () => void;
  onClickEntry: () => void;
}

export const LoginButton: FC<IProps> = (props: IProps) => {
  const { userData, onClickExit, onClickEntry } = props;
  const { t } = useTranslation('Auth');

  return (
    <div className={styles.container}>
      {userData ? (
        <div>
          <span className={styles.login}>{userData?.login}</span>
          <Icon
            size="large"
            title={t('Auth:Action.logout') ?? ''}
            name="logout"
            className={styles.header_icon}
            onClick={onClickExit}
          />
        </div>
      ) : (
        <Icon
          title={t('Auth:Action.login') ?? ''}
          name="login"
          size="large"
          className={styles.header_icon}
          onClick={onClickEntry}
        />
      )}
    </div>
  );
};
