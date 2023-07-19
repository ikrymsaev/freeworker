import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as ru from '@/static/locales/ru';
import * as en from '@/static/locales/en';

const resources = {
  ru,
  en,
};
i18next.use(initReactI18next).init({
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
