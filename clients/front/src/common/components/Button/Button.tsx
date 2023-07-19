import styles from './Button.module.scss';
import cn from 'classnames';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type TProps = {
  size?: 'large' | 'middle' | 'small';
  variant?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  children: React.ReactNode;
  disabled?: boolean;
};
type ButtonProps = TProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
/** Компонент кнопки. */
export const Button = (props: ButtonProps): JSX.Element => {
  const { disabled, children, variant = 'default', size = 'middle', className, ...restProps } = props;

  return (
    <button
      className={cn(
        styles.button,
        { [styles.disabled]: disabled },
        { [styles.primary]: variant === 'primary' },
        { [styles.ghost]: variant === 'ghost' },
        { [styles.dashed]: variant === 'dashed' },
        { [styles.link]: variant === 'link' },
        { [styles.text]: variant === 'text' },
        { [styles.default]: variant === 'default' },
        { [styles.large]: size === 'large' },
        { [styles.middle]: size === 'middle' },
        { [styles.small]: size === 'small' },
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
