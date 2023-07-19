import { Icon } from '@/common/components';
import { HeaderAccountSettings } from '@/features/HeaderAccountSettings';
import { LangSelector } from '@/features/LangSelector';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

type TProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Header = (props: TProps): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <header className={cn(styles.header, className)} {...restProps}>
      <Link to="/">
        <div className={styles.logo_block} tabIndex={0}>
          <span className={styles.title}>Busy-Buzzy-Bee</span>
          <Icon name="store-outline" />
        </div>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <LangSelector />
        <HeaderAccountSettings />
      </div>
    </header>
  );
};
