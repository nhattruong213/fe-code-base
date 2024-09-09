'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { FormProvider } from '@/components/atoms/formProvider';
import { Iconify } from '@/components/atoms/iconify';
import { TextField } from '@/components/atoms/textField';
import { useBoolean } from '@/hooks/useBoolean';

import { useLogic } from './hooks/useLogic';

export const Login = () => {
  const password = useBoolean();
  const { onSubmit } = useLogic();
  const LoginSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'truongnn@hybrid-technologies.vn',
    password: '12345678',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleOnSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <FormProvider methods={methods} onSubmit={handleOnSubmit}>
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">{'Sign in to Device'}</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{'New user?'}</Typography>

          <Link variant="subtitle2">{'Create an account'}</Link>
        </Stack>
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

        <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
          {'Forgot password?'}
        </Link>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          {'Login'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};
