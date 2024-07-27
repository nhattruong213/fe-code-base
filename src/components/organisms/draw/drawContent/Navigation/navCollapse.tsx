import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { DrawContext } from '@/components/organisms/layout/context';

import { MenuItem } from './declaration';
import { NavItem } from './navItem';



interface NavCollapseProps {
  menu: MenuItem;
  level: number;
}

export const NavCollapse: React.FC<NavCollapseProps> = ({ menu, level }) => {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const { drawerOpen } = useContext(DrawContext);

  const pathname = usePathname();

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected);
  };

  const checkOpenForParent = (child: MenuItem[]) => {
    child.forEach((item: MenuItem) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(true);
      }
    });
  };

  useEffect(() => {
    setOpen(false);
    setSelected(false);
    if (menu.children) {
      menu.children.forEach((item: MenuItem) => {
        if (item.children?.length) {
          checkOpenForParent(item.children);
        }

        if (item.url === pathname) {
          setSelected(true);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu.children]);
 
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
 
      default:
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;

    }
  });

  const Icon = menu.icon;
  const itemIcon = menu.icon && Icon ? 
    <Icon style={{ fontSize:  '1.25rem', color: 'inherit' }} /> : 
    (
      <FiberManualRecordIcon
        sx={{
          width: 6,
          height: 6,
          color: 'inherit'
        }}
        fontSize={level > 0 ? 'inherit' : 'medium'}
      />
    );

  return (
    <>
      <ListItemButton
          sx={({ palette }) => ({
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          '&:hover': {
            bgcolor: level === 1 ? palette.blue.main : 'transparent', 
            color: `${palette.blue['300']}`
          },
          '&.Mui-selected': {
            bgcolor:  level === 1 ? palette.blue.main: 'transparent', 
            borderRight: level > 1 ? `2px solid ${palette.primary.main}` : null,
            '&:hover': {
              bgcolor: palette.blue.main
            }
          }
        })}
        selected={selected}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={({ palette }) => ({
            minWidth: 28,
            color: selected ? palette.blue[300] : 'inherit',
          })}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body1" sx={({ palette }) => ({ color: selected ? palette.blue[300] : '' })}>
              {menu.title}
            </Typography>
          }
        />
        {open ? (
          <ExpandLessOutlinedIcon sx={({ palette }) => ({ fontSize: '16px', color: selected ? palette.blue[300] : '' })} />
        ) : (
          <ExpandMoreOutlinedIcon sx={({ palette }) => ({ fontSize: '16px', color: selected ? palette.blue[300] : '' })}/>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={({ palette }) => ({
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: palette.primary.light
            }
          })}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};
