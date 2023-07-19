import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import AuthPage from '@/layouts/pages/AuthPage/AuthPage';
import { createBrowserRouter } from 'react-router-dom';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <AuthPage />,
      },
    ],
  },
]);
