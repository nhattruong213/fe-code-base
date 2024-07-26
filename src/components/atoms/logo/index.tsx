import { ButtonBase, Chip, SxProps, Theme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

import { LogoMain } from './LogoMain';

type LogoSectionProps = {
  sx?: SxProps<Theme>; 
}

export const Logo: React.FC<LogoSectionProps> = ({ sx }) => {
  return (
    <ButtonBase disableRipple component={Link} href='' sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        <LogoMain />
        <Chip
          label={'Version 1'}
          variant="outlined"
          size="small"
          sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
        />
      </Stack>
    </ButtonBase>
  );
};
