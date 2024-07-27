import { Box, styled } from "@mui/material";

import { Logo } from "@/components/atoms/logo";


const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  paddingLeft: theme.spacing(3)
}));

export const DrawHeader = () => {
  return (
    <DrawerHeaderStyled>
      <Logo sx={{ width: 140 }} />
    </DrawerHeaderStyled>
  )
}