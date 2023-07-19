import { Authentication } from '@/widgets/index';
import styles from './AuthPage.module.scss';

/** Страница авторизации */
export default function AuthPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <Authentication />
    </div>
  );
}
