import cn from 'classnames';

import { ListItem } from '../ListItem';
import { List } from '../List';
import { SERVICE_ITEMS_NAMES, SIDEBAR_SERVICE_ITEMS } from '../../constants';

import { IDrawerProps } from './Drawer.types';

import styles from './Drawer.module.scss';

export const Drawer = ({
  children,
  isDrawerOpened = true,
  setIsOpened,
  activeItem,
  setActiveItem,
  isNoSettings = false,
  className,
  ...restProps
}: IDrawerProps): JSX.Element => {
  const toggleDrawerVisibility = (): void => setIsOpened && setIsOpened(!isDrawerOpened);

  return (
    <aside className={cn(styles.drawer, className, { [styles.closed]: !isDrawerOpened })} {...restProps}>
      {isNoSettings && <>{children}</>}
      {!isNoSettings && (
        <>
          <div>{children}</div>
          <div>
            <List isDrawerOpened={isDrawerOpened}>
              {SIDEBAR_SERVICE_ITEMS.map(({ icon, title }) => {
                const isHideItem = title === SERVICE_ITEMS_NAMES.hide;
                const isNavIcon = isHideItem && !isDrawerOpened;
                const iconName = isNavIcon ? 'subdirectory-arrow-right' : icon;

                return (
                  <ListItem
                    isDrawerOpened={isDrawerOpened}
                    activeItemText={activeItem}
                    setActiveItem={setActiveItem}
                    iconName={iconName}
                    isInactive={isHideItem}
                    onClick={isHideItem ? toggleDrawerVisibility : undefined}
                    text={title}
                    key={title}
                  />
                );
              })}
            </List>
          </div>
        </>
      )}
    </aside>
  );
};
