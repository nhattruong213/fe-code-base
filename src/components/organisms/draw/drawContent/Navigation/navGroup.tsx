import { Box, List, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { DrawContext } from '@/components/organisms/layout/context';

import { MenuGroup, MenuItem } from './declaration';
import { NavCollapse } from './navCollapse';
import { NavItem } from './navItem';

type NavGroupProps = {
  item: MenuGroup;
  key: string;
};
export const NavGroup = (props: NavGroupProps) => {
  const { item } = props;
  const { drawerOpen } = useContext(DrawContext);
  const t = useTranslations('Menu');

  const navCollapse = item.children?.map((groupItem: MenuItem) => {
    switch (groupItem.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={groupItem} level={1} />;

      default:
        return <NavItem key={groupItem.id} item={groupItem} level={1} />;
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="body2" color="textSecondary">
              {t(item.title)}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};
