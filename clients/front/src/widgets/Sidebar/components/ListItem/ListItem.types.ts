import { Dispatch, MouseEvent, SetStateAction, DetailedHTMLProps, HTMLAttributes } from 'react';
import { ISubItem } from '../../Sidebar.types';

export interface IListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  text: string;
  iconName?: string;
  disabled?: boolean;
  isDrawerOpened: boolean;
  onClick?: (event?: MouseEvent) => void;
  isInactive?: boolean;
  isSubItem?: boolean;
  isSubMenuOpened?: boolean;
  subItems?: ISubItem[] | undefined;
  setIsSubMenuOpened?: Dispatch<SetStateAction<boolean>>;
  activeItemText: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
}
