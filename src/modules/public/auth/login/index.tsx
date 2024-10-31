'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as LinkMui, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormProvider } from '@/components/atoms/formProvider';
import { Iconify } from '@/components/atoms/iconify';
import { TextField } from '@/components/atoms/textField';
import { ForgotPassword } from '@/constants/path';
import { useBoolean } from '@/hooks/useBoolean';

import { useLogic } from './hooks/useLogic';

export const Login = () => {
  const password = useBoolean();
  const { onSubmit, message, isPending } = useLogic();
  const theme = useTheme();
  const LoginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Email must be a valid email address'),
    password: z.string().min(1, 'Password is required'),
  });

  const defaultValues = {
    email: 'nguyennhattruong11223344@gmail.com',
    password: '12345678',
  };

  const methods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const handleOnSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <FormProvider methods={methods} onSubmit={handleOnSubmit}>
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">{'Sign in to Device'}</Typography>
      </Stack>

      <Stack spacing={2.5}>
        <TextField name="email" label="Email address" />

        <TextField
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
        <Typography sx={{ color: theme.palette.error.main }}>{message}</Typography>
        <LinkMui component={Link} href={ForgotPassword} variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
          {'Forgot password?'}
        </LinkMui>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isPending}>
          {'Login'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};
