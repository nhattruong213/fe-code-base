import Box from '@mui/material/Box';

import { menuItems } from './menuItem';
import { NavGroup } from './navGroup';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export const Navigation = () => {

  const navGroups = menuItems.items.map((item) => {
      return <NavGroup key={item.id} item={item} />
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
