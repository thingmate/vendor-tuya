import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi, IBaseTuyaApiRequestOptions } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';
import { normalizeTuyaAccessToken } from '../types/tuya-access-token/normalize-tuya-access-token';
import { ITuyaAccessTokenJSON } from '../types/tuya-access-token/tuya-access-token-json.type';
import { ITuyaAccessToken } from '../types/tuya-access-token/tuya-access-token.type';

export interface IRefreshTuyaAccessTokenOptions extends IBaseTuyaApiRequestOptions {
  refreshToken: string;
}

export function refreshTuyaAccessToken(
  {
    location,
    refreshToken,
    ...options
  }: IRefreshTuyaAccessTokenOptions,
): AsyncTask<ITuyaAccessToken> {
  const url: URL = new URL(`${getTuyaApiOrigin(location)}/v1.0/token/${refreshToken}`);

  return fetchTuyaApi<ITuyaAccessTokenJSON>({
    ...options,
    url,
    method: 'GET',
  })
    .successful(normalizeTuyaAccessToken);
}
