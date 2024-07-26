import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import { drawerWidth } from '@/constants/app';
import { theme } from '@/styles/theme';

interface MiniDrawerStyledProps {
  open?: boolean;
}

export const MiniDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MiniDrawerStyledProps>(({ open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    width: drawerWidth,
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    boxShadow: 'none',
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      borderRight: '1px solid',
      borderRightColor: theme.palette.divider,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
      boxShadow: 'none',
    },
  }),
  ...(!open && {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    borderRight: 'none',
    boxShadow: theme.customShadows.z1,
    '& .MuiDrawer-paper': {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 0,
      borderRight: 'none',
      boxShadow: theme.customShadows.z1,
    },
  }),
}));