import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, InputAdornment, Link as LinkMui, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormProvider } from '@/components/atoms/formProvider';
import { Iconify } from '@/components/atoms/iconify';
import { TextField } from '@/components/atoms/textField';
import { LoginPath } from '@/constants/path';
import { useBoolean } from '@/hooks/useBoolean';

import { TChangePassword } from '../type';

type TProp = {
  isPending: boolean;
  successMess: string;
  errorMess: string;
  handleChange: (data: TChangePassword) => void;
};
export const SetNewPassword = (prop: TProp) => {
  const { isPending, successMess, errorMess, handleChange } = prop;
  const password = useBoolean();
  const schema = z
    .object({
      password: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Confirm password must match password',
      path: ['confirmPassword'],
    });

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit } = methods;
  const theme = useTheme();
  const onSubmit = handleSubmit((data) => {
    handleChange({
      password: data.password,
    });
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">{'Set new password'}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {'Please enter new password.'}
        </Typography>
      </Stack>
      <Stack spacing={2} alignItems="center">
        <TextField
          fullWidth
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm New Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography sx={{ color: theme.palette.success.main }}>{successMess}</Typography>
        <Typography sx={{ color: theme.palette.error.main }}>{errorMess}</Typography>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isPending}>
          {'Update Password'}
        </LoadingButton>

        <LinkMui
          component={Link}
          href={LoginPath}
          color="inherit"
          variant="subtitle2"
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
          }}
        >
          <Iconify icon="eva:arrow-ios-back-fill" width={16} />
          {'Return to sign in'}
        </LinkMui>
      </Stack>
    </FormProvider>
  );
};
