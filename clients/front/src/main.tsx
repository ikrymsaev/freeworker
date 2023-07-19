import ReactDOM from 'react-dom/client';
import { App } from './app';
import '@/services/I18nService/I18nService';
import '@/styles/variables/colors.css';
import '@/styles/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
