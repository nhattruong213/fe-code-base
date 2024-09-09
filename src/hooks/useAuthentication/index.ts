import { useEffect } from 'react';

import { AUTH_KEY } from '@/constants/auth';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { authAction } from '@/stores/reducers/auth';
import { TToken } from '@/types/auth';
import { decodeAuth, encodeAuth } from '@/utils/auth';

import { useAuthenticationChange } from '../useAuthenticationChange';

export const useAuthentication = () => {
  useAuthenticationChange();

  const { isLoadedToken, token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const authentication = localStorage.getItem(AUTH_KEY);
    const token: TToken = decodeAuth(authentication);

    dispatch(authAction.setToken(token));
  }, []);

  useEffect(() => {
    if (isLoadedToken === true) {
      localStorage.setItem(AUTH_KEY, encodeAuth(token || ''));
    }
  }, [token]);

  return {};
};
