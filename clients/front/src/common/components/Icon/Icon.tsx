import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';

type TIconSize = 'small' | 'medium' | 'large';
type TIconType = 'default' | 'error' | 'warning' | 'success' | 'info';

interface IIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  size?: TIconSize;
  type?: TIconType;
  filled?: boolean;
  name: string;
  className?: string;
  onClick?: () => void;
}

export const Icon = (props: IIconProps): JSX.Element => {
  const { className, name, filled, size = 'medium', type = 'default', ...rest } = props;
  const fontIconClass = `icon mdi mdi-${name}`;

  return (
    <span
      {...rest}
      className={cn(
        styles.icon,
        fontIconClass,
        styles[size],
        styles[type],
        { [styles.filled]: filled },
        { [styles.clickable]: !!props.onClick },
        className
      )}
    />
  );
};
