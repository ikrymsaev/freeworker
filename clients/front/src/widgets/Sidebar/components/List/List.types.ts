import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  isDivider?: boolean;
  label?: string;
  isDrawerOpened: boolean;
}
