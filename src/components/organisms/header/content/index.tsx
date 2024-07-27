import GitHubIcon from '@mui/icons-material/GitHub';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Badge, Box, IconButton, Link } from "@mui/material";

import { Profile } from './profile';

export const HeaderContent = () => {

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        component={Link}
        href="https://github.com/nhattruong213"
        target="_blank"
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: 'gray.100', borderRadius: '5px' }}
      >
        <GitHubIcon />
      </IconButton>
      <Box sx={{ width: '5px' }}/>
      <IconButton
        color="secondary"
        sx={{ color: 'text.primary', bgcolor:'transparent', borderRadius: '5px' }}
        aria-label="open profile"
        aria-haspopup="true"
      >
        <Badge badgeContent={2} color="primary">
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <Box sx={{ width: '5px' }}/>
      <Profile />
    </>
  )
}