import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

/** Шаблон страницы авторизации. */
export default function AuthLayout(): JSX.Element {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
