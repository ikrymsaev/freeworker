import cn from 'classnames';
import { IListProps } from './List.types';
import styles from './List.module.scss';

export const List = ({
  children,
  className,
  isDivider,
  label = '',
  isDrawerOpened,
  ...restProps
}: IListProps): JSX.Element => {
  const isShowLabel = label && isDrawerOpened;

  return (
    <div className={cn(styles.wrapper, className)} {...restProps}>
      {isDivider && <div className={styles.dividerWrapper} />}
      {isShowLabel && <span>{label}</span>}
      <ul className={isDivider ? styles.list : undefined}>{children}</ul>
    </div>
  );
};
