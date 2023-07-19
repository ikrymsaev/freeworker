import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './ListItem.module.scss';
import { IListItemProps } from './ListItem.types';
import { Icon } from '@/common/components';

/**
 * @param props
 */
export const ListItem = (props: IListItemProps): JSX.Element => {
  const {
    text,
    className,
    iconName = '',
    disabled = false,
    isDrawerOpened,
    onClick,
    isInactive = false,
    isSubItem = false,
    isSubMenuOpened = false,
    setIsSubMenuOpened,
    subItems,
    activeItemText,
    setActiveItem,
    ...restProps
  } = props;
  const [isActiveItem, setIsActiveItem] = useState<boolean>(activeItemText === text);
  const [isPressedItem, setIsPressedItem] = useState<boolean>(false);

  const isItemCanBeActive = !isInactive && !subItems;
  const isItemHasSubItems = !!subItems && subItems.length !== 0;
  const isMustToggleSubMenu = isItemHasSubItems && setIsSubMenuOpened && isDrawerOpened;
  const isItemHasIcon = !!iconName;
  const isNotCurrentActiveItem = text !== activeItemText;
  const isActiveSubItem = isSubItem && isActiveItem;
  const isMustShowIndicator = isActiveItem && !isSubItem;
  const isMustShowExpandIcon = isItemHasSubItems && isDrawerOpened;
  const currentExpandIcon = isSubMenuOpened ? 'tray-arrow-up' : 'tray-arrow-down';

  useEffect(() => {
    const subItemsTitles = (subItems || []).map(({ title }) => title);
    const isSomeSubItemIsActive = subItemsTitles.includes(activeItemText);
    const isCloseSubMenuIfSubItemNotCurrentActiveItem =
      isNotCurrentActiveItem && !isSomeSubItemIsActive && setIsSubMenuOpened;

    if (isItemHasSubItems && isSomeSubItemIsActive) {
      setIsActiveItem(true);
    } else if (isNotCurrentActiveItem) {
      setIsActiveItem(false);
    }

    if (isCloseSubMenuIfSubItemNotCurrentActiveItem) {
      setIsSubMenuOpened(false);
    }
  }, [activeItemText, isItemHasSubItems, isNotCurrentActiveItem, setIsSubMenuOpened, subItems]);

  /**
   *
   */
  const handleItemClick = (): void => {
    if (isItemCanBeActive) {
      setIsActiveItem(true);
      setActiveItem(text);
    }

    if (isMustToggleSubMenu) {
      setIsSubMenuOpened(!isSubMenuOpened);
    }

    onClick?.();
  };

  /**
   *
   */
  const handleMouseDownOnItem = (): void => {
    setIsPressedItem(true);
  };
  /**
   *
   */
  const handleMouseUpOnItem = (): void => {
    setIsPressedItem(false);
  };

  const wrapperClasses = cn(styles.wrapper, className);
  const itemContentClasses = cn(styles.content, {
    [styles.expand]: subItems,
    [styles.disabled]: disabled,
    [styles.pressed]: isPressedItem,
    [styles.narrow]: !isDrawerOpened,
    [styles.subItem]: isSubItem,
    [styles.subItemActive]: isActiveSubItem,
  });
  const mainIconClasses = cn(styles.mainIcon, {
    [styles.mainIconDisabled]: disabled,
    [styles.chosenIcon]: isActiveItem,
  });
  const textClasses = cn(styles.text, {
    [styles.textDisabled]: disabled,
    [styles.chosenText]: isActiveItem,
    [styles.subItemText]: isSubItem,
  });
  const expandIconClasses = cn(styles.expandIcon, {
    [styles.expandIconDisabled]: disabled,
    [styles.chosenExpandIcon]: isActiveItem,
  });

  return (
    <li
      className={wrapperClasses}
      tabIndex={0}
      onClick={handleItemClick}
      onMouseDown={handleMouseDownOnItem}
      onMouseUp={handleMouseUpOnItem}
      {...restProps}
    >
      <div className={itemContentClasses}>
        {isMustShowIndicator && <div className={styles.indicator} />}
        {isItemHasIcon && <Icon name={iconName} size="large" className={mainIconClasses} />}
        {isDrawerOpened && <span className={textClasses}>{text}</span>}
        {isMustShowExpandIcon && <Icon name={currentExpandIcon} size="large" className={expandIconClasses} />}
      </div>
    </li>
  );
};
