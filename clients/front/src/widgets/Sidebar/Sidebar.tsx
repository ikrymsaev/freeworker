import { useState } from 'react';
import { Drawer } from './components/Drawer';
import { List } from './components/List';
import { ListItem } from './components/ListItem';
import { SIDEBAR_ITEMS } from './constants';

export const Sidebar = (): JSX.Element => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<string>('');

  return (
    <Drawer
      isDrawerOpened={isDrawerOpened}
      setIsOpened={setIsDrawerOpened}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <List isDrawerOpened={isDrawerOpened}>
        {SIDEBAR_ITEMS.map(({ icon, title }) => (
          <ListItem
            iconName={icon}
            isDrawerOpened={isDrawerOpened}
            activeItemText={activeItem}
            setActiveItem={setActiveItem}
            text={title}
            key={title + icon}
          />
        ))}
      </List>
    </Drawer>
  );
};
