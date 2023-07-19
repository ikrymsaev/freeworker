import { langOptions } from '../constants/constants';
import i18n from '@/services/I18nService/I18nService';
import { TSelectInputOption } from '@/common/index';

export const getTranslatedLangsList = (): TSelectInputOption[] =>
  langOptions.map((l) => ({ ...l, label: i18n.t(`Common:Lang.locale.${l.value}`) }));
