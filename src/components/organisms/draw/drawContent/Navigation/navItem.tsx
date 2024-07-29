'use client';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useContext, useEffect, useState } from 'react';

import { DrawContext } from '@/components/organisms/layout/context';

import { MenuItem } from './declaration';

interface NavItemProps {
  item: MenuItem;
  level: number;
}

export const NavItem: React.FC<NavItemProps> = ({ item, level }) => {
  const t = useTranslations('Menu');
  const { drawerOpen } = useContext(DrawContext);
  const pathname = usePathname();
  const checkSelected = item.url === pathname ? true : false;
  const [isSelected, setIsSelected] = useState(checkSelected);
  const Icon = item.icon;
  const itemIcon =
    item.icon && Icon ? (
      <Icon style={{ fontSize: '1.25rem', color: 'inherit' }} />
    ) : (
      <FiberManualRecordIcon
        sx={{
          width: 6,
          height: 6,
          color: 'inherit',
        }}
        fontSize={level > 0 ? 'inherit' : 'medium'}
      />
    );

  useEffect(() => {
    setIsSelected(checkSelected);
  }, [pathname]);

  return (
    <ListItemButton
      disableRipple={level > 1}
      component={Link}
      href={item.url}
      target={item.target ? '_blank' : '_self'}
      disabled={item.disabled}
      selected={isSelected}
      sx={({ palette }) => ({
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        '&:hover': {
          bgcolor: level === 1 ? palette.blue.main : 'transparent',
          color: `${palette.blue['300']}`,
        },
        '&.Mui-selected': {
          bgcolor: level === 1 ? palette.blue.main : 'transparent',
          borderRight: `2px solid ${palette.primary.main}`,
          '&:hover': {
            bgcolor: level > 1 ? 'transparent' : palette.blue.main,
          },
        },
      })}
    >
      <ListItemIcon
        sx={({ palette }) => ({
          minWidth: 28,
          color: isSelected ? palette.blue[300] : 'inherit',
        })}
      >
        {itemIcon}
      </ListItemIcon>
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography variant="body1" sx={({ palette }) => ({ color: isSelected ? palette.blue[300] : '' })}>
              {t(item.title)}
            </Typography>
          }
        />
      )}
    </ListItemButton>
  );
};
