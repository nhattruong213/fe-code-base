import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Box, ClickAwayListener, IconButton, List, ListItemButton, ListItemText, Paper, Popper } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { MainCard } from '@/components/atoms/mainCard';
import { Transitions } from '@/components/atoms/transitions';
import { Locale } from '@/config';
import { LANGUGE_OPTIONS } from '@/constants/languageSelect';
import { setUserLocale } from '@/services/locale';

export const Language = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const locale = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(locale);
  const t = useTranslations('Header');

  const handleListItemClick = (value: string) => {
    const locale = value as Locale;
    setUserLocale(locale);
    setSelected(value);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? 'profile-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          disableRipple
          color="secondary"
          sx={({ palette }) => ({
            color: 'text.primary',
            background: open ? `${palette.gray[100]}` : 'transparent',
            borderRadius: '5px',
            ':hover': {
              bgcolor: 'gray.100',
            },
          })}
        >
          <LanguageOutlinedIcon />
        </IconButton>
        <Popper
          placement="bottom-end"
          open={open}
          anchorEl={anchorRef.current}
          disablePortal
          transition
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 9],
                },
              },
            ],
          }}
        >
          {({ TransitionProps }) => (
            <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
              <Paper sx={(theme) => ({ boxShadow: theme.customShadows.z1, width: 170, minWidth: 100, maxWidth: { xs: 250, md: 290 } })}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
                      {LANGUGE_OPTIONS.map((val, index) => (
                        <ListItemButton key={index} selected={selected === val.code} onClick={() => handleListItemClick(val.code)}>
                          <ListItemText primary={t(val.code)} />
                        </ListItemButton>
                      ))}
                    </List>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          )}
        </Popper>
      </Box>
    </>
  );
};
