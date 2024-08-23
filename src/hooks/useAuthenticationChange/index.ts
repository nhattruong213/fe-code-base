import { useEffect } from 'react';

import { AUTH_KEY } from '@/constants/auth';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { authAction } from '@/stores/reducers/auth';
import { TToken } from '@/types/auth';
import { decodeAuth } from '@/utils/auth';

export const useAuthenticationChange = () => {
  const { token } = useAppSelector((state) => state.user);
  const { type } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.onstorage = () => {
      const authentication = localStorage.getItem(AUTH_KEY);
      const tokenDecode: TToken = decodeAuth(authentication);
      if (!tokenDecode.accessToken || !tokenDecode.refreshToken) {
        return dispatch(authAction.removeUser());
      }

      if (token?.accessToken !== tokenDecode.accessToken || token?.refreshToken !== tokenDecode.refreshToken) {
        return dispatch(authAction.setToken(tokenDecode));
      }
    };
  }, [type]);

  return {};
};
