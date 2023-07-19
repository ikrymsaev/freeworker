import { Provider } from 'react-redux';
import { Router } from './router';
import { store } from './redux';

export const App = (): JSX.Element => (
  <Provider store={store}>
    <Router />
  </Provider>
);
