import { useState } from 'react';

import { useMutation } from '@/hooks/useMutation';
import { LoginReq, TLoginReq } from '@/schemas/auth/request';
import { LoginRes } from '@/schemas/auth/response';
import { postLogin } from '@/services/api/login';
import { useAppDispatch } from '@/stores/hooks';
import { authAction } from '@/stores/reducers/auth';

const LOGIN_LOADING_KEY = 'login-loading';

export const useLogic = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const { mutate, isPending } = useMutation({
    apiConfig: postLogin,
    requestSchema: LoginReq,
    responseSchema: LoginRes,
    loadingKey: LOGIN_LOADING_KEY,
    onSuccess: (response) => {
      dispatch(
        authAction.setToken({
          accessToken: response.data?.accessToken || null,
          refreshToken: response.data?.refreshToken || null,
        })
      );
    },
    onError: () => {
      setMessage('Email or password is incorrect.');
    },
  });

  const onSubmit = (data: TLoginReq) => mutate(data);

  return { onSubmit, isPending, message };
};
