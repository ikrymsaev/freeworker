import styles from './Alert.module.scss';
import cn from 'classnames';
import { Icon } from '../Icon/Icon';

type TAlertType = 'error' | 'warning' | 'success' | 'info';

interface IProps {
  title: string;
  message?: string;
  type: TAlertType;
}

type IAlertTypeIconsConfig = {
  [key in TAlertType]: string;
};
const alertTypeIconsConfig: IAlertTypeIconsConfig = {
  error: 'battery',
  warning: 'bell-cancel-outline',
  info: 'book-play',
  success: 'bullhorn-outline',
};

export const Alert = (props: IProps): JSX.Element => {
  const { title, message, type } = props;

  return (
    <div
      className={cn(
        styles.contanier,
        { [styles.error]: type === 'error' },
        { [styles.warning]: type === 'warning' },
        { [styles.info]: type === 'info' },
        { [styles.success]: type === 'success' }
      )}
    >
      <div className={styles.icon}>
        <Icon
          name={alertTypeIconsConfig[type]}
          className={cn(
            { [styles.error_icon]: type === 'error' },
            { [styles.warning_icon]: type === 'warning' },
            { [styles.info_icon]: type === 'info' },
            { [styles.success_icon]: type === 'success' }
          )}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {!!message && <span className={styles.message}>{message}</span>}
      </div>
    </div>
  );
};
