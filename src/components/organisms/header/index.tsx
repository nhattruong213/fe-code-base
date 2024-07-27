"use client";

import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Breakpoint, IconButton, Toolbar, useMediaQuery } from "@mui/material"
import { useContext, useMemo } from "react";

import { theme } from '@/styles/theme';

import { DrawContext } from '../layout/context';
import { AppBarStyled } from "./AppBarStyled";
import { HeaderContent } from './content';
export const Header = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg' as Breakpoint));
  const { drawerOpen, handlerDrawerOpen } = useContext(DrawContext);


  const headerContent = useMemo(() => <HeaderContent />, []);
  
  const mainHeader = (
    <Toolbar sx={{ backgroundColor: '#fff' }}>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={() => handlerDrawerOpen(!drawerOpen)}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: 'gray.100', ml: { xs: 0, lg: -2 }, borderRadius: '5px' }}
      >
        {!drawerOpen ? (<MenuOutlinedIcon />) : (<MenuOpenOutlinedIcon />)}
      </IconButton>
      {headerContent}
    </Toolbar>
  );
  
  const appBar = {
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }

  return (
    <>
      {
        isMobile ? (
            <AppBar position="fixed" color="transparent" {...appBar}>{mainHeader}</AppBar>
        ) : (
          <AppBarStyled position="fixed" color="transparent" {...appBar} open={drawerOpen}>
            {mainHeader}
          </AppBarStyled>
        )
      }
    </>
  )
}