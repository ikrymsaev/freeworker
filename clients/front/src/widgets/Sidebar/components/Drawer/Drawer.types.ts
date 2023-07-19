import { DetailedHTMLProps, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';

export interface IDrawerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  isDrawerOpened?: boolean;
  setIsOpened?: Dispatch<SetStateAction<boolean>>;
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
  isNoSettings?: boolean;
}
