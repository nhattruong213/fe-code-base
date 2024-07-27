import Box from '@mui/material/Box';

import { MenuGroup } from './declaration';
import { menuItems } from './menuItem';
import { NavGroup } from './navGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export const Navigation = () => {

  const navGroups = menuItems.items.map((item: MenuGroup) => {
      return <NavGroup key={item.id} item={item} />
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
