import styled from "@emotion/styled";
import { AppBar } from "@mui/material";

import { drawerWidth } from "@/constants/app";


export const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({  open }: { open : boolean}) => ({
  zIndex: 1000,
  left: 0,
  transition: 'width 0.3s ease, margin 0.3s ease',
  ...(!open && {
    width: `100%`
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: 'width 0.3s ease, margin 0.3s ease'
  })
}));