import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link as LinkMui, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormProvider } from '@/components/atoms/formProvider';
import { Iconify } from '@/components/atoms/iconify';
import { TextCode } from '@/components/atoms/textCode';
import { LoginPath } from '@/constants/path';

import { ForgotPasswordStep } from '../constant';
import { TVerifyCode } from '../type';

type TProp = {
  handleVerifyCode: (data: TVerifyCode) => void;
  isPending: boolean;
  message: string;
  setStep: (step: number) => void;
};
export const VerifyCode = (prop: TProp) => {
  const { handleVerifyCode, setStep, message, isPending } = prop;
  const schema = z.object({
    code: z.string().min(6, 'Code must be at least 6 characters'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
    },
  });

  const { handleSubmit } = methods;
  const handleOnSubmit = handleSubmit((data) => {
    handleVerifyCode(data);
  });
  const theme = useTheme();

  return (
    <FormProvider methods={methods} onSubmit={handleOnSubmit}>
      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">{'Please check your email!'}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {'We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify your email.'}
        </Typography>
      </Stack>
      <Stack spacing={3} alignItems="center">
        <TextCode name="code" />
        <Typography sx={{ color: theme.palette.error.main }}>{message}</Typography>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isPending}>
          {'Verify'}
        </LoadingButton>

        <Typography variant="body2">
          {`Don’t have a code? `}
          <LinkMui
            onClick={() => setStep(ForgotPasswordStep.sendEmail)}
            variant="subtitle2"
            component="button"
            sx={{
              cursor: 'pointer',
            }}
          >
            {'Resend code'}
          </LinkMui>
        </Typography>

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
