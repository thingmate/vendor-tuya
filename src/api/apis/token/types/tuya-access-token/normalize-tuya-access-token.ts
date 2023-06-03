import { ITuyaAccessTokenJSON } from './tuya-access-token-json.type';
import { ITuyaAccessToken } from './tuya-access-token.type';

export function normalizeTuyaAccessToken(
  {
    access_token,
    refresh_token,
    expire_time,
  }: ITuyaAccessTokenJSON,
): ITuyaAccessToken {
  return {
    accessToken: access_token,
    refreshToken: refresh_token,
    expireDate: Date.now() + (expire_time * 1000),
  };
}
