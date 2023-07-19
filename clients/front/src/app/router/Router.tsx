import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';

export const Router = (): JSX.Element => <RouterProvider router={routes} />;
