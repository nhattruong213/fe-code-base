import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMutation } from '@/hooks/useMutation';
import { LoginReq, TLoginReq } from '@/schemas/auth/request';
import { LoginRes } from '@/schemas/auth/response';
import { postLogin } from '@/services/api/login';

const LOGIN_LOADING_KEY = 'login-loading';

export const useLogic = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { mutate, isPending } = useMutation({
    apiConfig: postLogin,
    requestSchema: LoginReq,
    responseSchema: LoginRes,
    loadingKey: LOGIN_LOADING_KEY,
    onSuccess: (response) => {
      const oneYearInSeconds = 365 * 24 * 60 * 60;
      const accessToken = response.data?.accessToken || null;
      const refreshToken = response.data?.refreshToken || null;

      Cookies.set('access_token', accessToken as string, { expires: oneYearInSeconds, path: '/' });
      Cookies.set('refresh_token', refreshToken as string, { expires: oneYearInSeconds, path: '/' });

      router.push('/');
    },
    onError: () => {
      setMessage('Email or password is incorrect.');
    },
  });

  const onSubmit = (data: TLoginReq) => {
    mutate(data);
  };  

  return { onSubmit, isPending, message };
};
