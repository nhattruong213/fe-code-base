import { Box, Breadcrumbs, Stack, Typography } from '@mui/material';

import { LinkItem } from './linkItem';
import { CustomBreadcrumbsProps } from './type';

export const BreadcrumbsNNT = (props: CustomBreadcrumbsProps) => {
  const { links, action, heading, activeLast, sx, ...res } = props;
  const lastLink = links[links.length - 1].name;

  return (
    <Box sx={{ ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && (
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          {!!links.length && (
            <Breadcrumbs {...res}>
              {links.map((link) => (
                <LinkItem key={link.name || ''} link={link} activeLast={activeLast} disabled={link.name === lastLink} />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>
    </Box>
  );
};
