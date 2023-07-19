import { Loader } from '@/common/components';
import i18n from 'i18next';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

export const I18Provider = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<Loader withOverlay />}>{children}</Suspense>
  </I18nextProvider>
);
