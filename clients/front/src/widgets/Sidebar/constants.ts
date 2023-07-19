import { IItem } from './Sidebar.types';

export const SERVICE_ITEMS_NAMES = {
  settings: 'Настройки',
  hide: 'Скрыть',
};

export const SIDEBAR_SERVICE_ITEMS: IItem[] = [
  { icon: 'database-settings', title: SERVICE_ITEMS_NAMES.settings },
  { icon: 'eye-arrow-left', title: SERVICE_ITEMS_NAMES.hide },
];

export const SIDEBAR_ITEMS: IItem[] = [
  { icon: 'folder-home-outline', title: 'Главная' },
  { icon: 'format-list-checks', title: 'Категории' },
  { icon: 'calendar-arrow-right', title: 'Календарь' },
  { icon: 'av-timer', title: 'Мои записи' },
];
