import qs from 'qs';

const AUTHORITY_URL = import.meta.env.VITE_AUTHORITY;

const SIGN_IN_URL = `${AUTHORITY_URL}/connect/token`;
const USER_INFO_URL = `${AUTHORITY_URL}/connect/userinfo`;
const REVOCATION_URL = `${AUTHORITY_URL}/connect/revocation`;

const CLIENT_ID = 'admin-portal';

type RawSignInSuccessResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type SignInSuccessResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

type PasswordSignInPayload = {
  username: string;
  password: string;
  rememberMe: boolean;
};

type RefreshTokenPayload = {
  refresh_token: string;
};

const signIn = (signInData: Record<string, any>) => {
  const payload = {
    ...signInData,
    client_id: CLIENT_ID,
    scope: ['openid', 'offline_access', 'email', 'phone', 'profile'].join(' '),
  };

  return fetch(SIGN_IN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(payload),
  });
};

const mapSignInResponse = (response: RawSignInSuccessResponse): SignInSuccessResponse => ({
  accessToken: response.access_token,
  refreshToken: response.refresh_token,
  tokenType: response.token_type,
});

const signInWithPassword = async (payload: PasswordSignInPayload) => {
  // const response = await signIn({
  //   ...payload,
  //   grant_type: 'password',
  // });
  // const responseInJson = await response.json();

  // if (response.status !== 200 || !responseInJson.access_token) {
  //   throw new Error('Failed to sign in');
  // }

  // return mapSignInResponse(responseInJson);
  return {
    accessToken: 'mila',
    refreshToken: 'mila',
    tokenType: 'mila',
  } as SignInSuccessResponse;
};

const refreshToken = async (payload: RefreshTokenPayload) => {
  const response = await signIn({
    refresh_token: payload.refresh_token,
    grant_type: 'refresh_token',
  });
  const responseInJson = await response.json();

  if (response.status !== 200 || !responseInJson.access_token) {
    const errorMessage = responseInJson?.error || 'Failed to refresh token';

    throw new Error(errorMessage);
  }

  return mapSignInResponse(responseInJson);
};

const getIdentityUserInfo = async (accessToken: string, tokenType: string) => {
  // const response = await fetch(USER_INFO_URL, {
  //   headers: {
  //     Authorization: `${tokenType} ${accessToken}`,
  //   },
  // });

  // if (response.status !== 200) {
  //   throw new Error('Failed to get user info');
  // }

  // return await response.json();
  return {
    id: 'mila',
  };
};

const credential = btoa(CLIENT_ID + ':');
const revokeToken = async (token: string, tokenTypeHint: string) => {
  if (!token || !tokenTypeHint) {
    return;
  }

  return fetch(REVOCATION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credential}`,
    },
    body: qs.stringify({
      token,
      token_type_hint: tokenTypeHint,
    }),
  });
};

export const AuthUtils = {
  signInWithPassword,
  refreshToken,
  getIdentityUserInfo,
  revokeToken,
};
