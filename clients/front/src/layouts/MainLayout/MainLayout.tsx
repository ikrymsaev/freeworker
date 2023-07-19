import { Header } from '@/widgets/Header/Header';
import MainPage from '@/layouts/pages/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { Sidebar } from '@/widgets/Sidebar';

/** Базовый шаблон страницы. */
export default function MainLayout(): JSX.Element {
  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </main>
    </div>
  );
}
