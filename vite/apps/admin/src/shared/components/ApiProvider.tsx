import { PropsWithChildren, useRef } from 'react';

import { ApiProvider as Base } from '@vklink/grpc-api';

import { useAuth } from '@/app/modules/auth';
import { AuthUtils } from '../utils';

const API_URL = import.meta.env.VITE_API_URL;

type Props = PropsWithChildren;

const ApiProvider = ({ children }: Props) => {
  const { auth, saveAuth, logout } = useAuth();

  const isRefreshing = useRef(false);
  const failedQueue = useRef<{ resolve: (value?: any) => void; reject: (reason?: any) => void }[]>(
    []
  );

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.current.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue.current = [];
  };

  const refreshTokenAsync = async (): Promise<string | null | undefined> => {
    if (!auth?.refreshToken) {
      return null;
    }

    if (isRefreshing.current) {
      return new Promise(function (resolve, reject) {
        failedQueue.current.push({ resolve, reject });
      });
    }

    isRefreshing.current = true;

    try {
      const newToken = await AuthUtils.refreshToken({
        refresh_token: auth?.refreshToken,
      });

      saveAuth({
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
        tokenType: newToken.tokenType,
      });

      processQueue(null, newToken.accessToken);
      return newToken.accessToken;
    } catch (error) {
      processQueue(error, null);
      logout();
    } finally {
      isRefreshing.current = false;
    }
  };

  const getTokenAsync = () => {
    return Promise.resolve(auth?.accessToken || '');
  };

  return (
    <Base getTokenAsync={getTokenAsync} apiUrl={API_URL} refreshTokenAsync={refreshTokenAsync}>
      {children}
    </Base>
  );
};

export { ApiProvider };
