import { SelectInput, TOptionValue } from '@/common/components';
import { useTranslation } from 'react-i18next';
import { getTranslatedLangsList } from './helpers/getTranslatedLangsList';

export const LangSelector = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  const handleChangeLang = (value?: TOptionValue): void => {
    if (typeof value === 'string') {
      i18n.changeLanguage(value);
    }
  };

  return (
    <SelectInput
      label={t('Common:Lang.language') ?? ''}
      value={i18n.language}
      options={getTranslatedLangsList()}
      onChange={handleChangeLang}
    />
  );
};
