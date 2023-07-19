import styles from './WithLoading.module.scss';
import cn from 'classnames';
import { Loader } from '../Loader/Loader';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLoading?: boolean;
  children: ReactNode | ReactNode[];
}
export const WithLoading = (props: IProps): JSX.Element => {
  const { isLoading, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(props.className, { [styles.container]: isLoading })}>
      {children}
      {isLoading && <Loader />}
    </div>
  );
};
