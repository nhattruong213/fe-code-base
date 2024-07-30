'use client';

import { Breakpoint, Drawer, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useMemo } from 'react';

import { drawerWidth } from '@/constants/app';
import { theme } from '@/styles/theme';

import { DrawContext } from '../layout/context';
import { DrawContent } from './drawContent';
import { DrawHeader } from './drawHeader';
import { MiniDrawer } from './miniDrawer';

export const Draw = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg' as Breakpoint));
  const { drawerOpen, handlerDrawerOpen } = useContext(DrawContext);

  const drawerHeader = useMemo(() => <DrawHeader />, []);
  const drawerContent = useMemo(() => <DrawContent />, []);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderRightColor: 'divider',
              backgroundImage: 'none',
              boxShadow: 'inherit',
            },
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      ) : (
        <MiniDrawer variant="permanent" open={drawerOpen}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawer>
      )}
    </Box>
  );
};
