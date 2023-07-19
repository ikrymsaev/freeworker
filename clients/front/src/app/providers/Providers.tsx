import { Provider } from 'react-redux';
import { store } from '../redux';
import { I18Provider } from './I18Provider/I18Provider';

export const Providers = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <I18Provider>
    <Provider store={store}>{children}</Provider>
  </I18Provider>
);
