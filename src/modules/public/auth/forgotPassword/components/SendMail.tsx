import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as LinkMui, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormProvider } from '@/components/atoms/formProvider';
import { Iconify } from '@/components/atoms/iconify';
import { TextField } from '@/components/atoms/textField';
import { LoginPath } from '@/constants/path';
import { TSendMailRequest } from '@/schemas/forgotPassword/forgotRequest';

type TProp = {
  handleSendMail: (data: TSendMailRequest) => void;
  isPending: boolean;
  message: string;
};

export const SendMail = (prop: TProp) => {
  const { handleSendMail, isPending, message } = prop;
  const ForgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Email must be a valid email address'),
  });
  const theme = useTheme();
  const methods = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit } = methods;

  const handleOnSubmit = handleSubmit((data) => {
    handleSendMail(data);
  });

  return (
    <FormProvider methods={methods} onSubmit={handleOnSubmit}>
      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">{'Forgot your password?'}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {'Please enter the email address associated with your account and We will email you a link to reset your password.'}
        </Typography>
      </Stack>
      <Stack spacing={2.5}>
        <TextField name="email" label="Email address" />
        <Typography sx={{ color: theme.palette.error.main }}>{message}</Typography>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isPending}>
          {'Send Request'}
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
