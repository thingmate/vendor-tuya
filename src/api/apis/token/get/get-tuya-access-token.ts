import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi, IBaseTuyaApiRequestOptions } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';
import { normalizeTuyaAccessToken } from '../types/tuya-access-token/normalize-tuya-access-token';
import { ITuyaAccessTokenJSON } from '../types/tuya-access-token/tuya-access-token-json.type';
import { ITuyaAccessToken } from '../types/tuya-access-token/tuya-access-token.type';

export interface IGetTuyaAccessTokenOptions extends IBaseTuyaApiRequestOptions {
  grantType?: 1 | 2;
  code?: string;
  terminalId?: string;
}


export function getTuyaAccessToken(
  {
    location,
    grantType = 1,
    code,
    terminalId,
    ...options
  }: IGetTuyaAccessTokenOptions,
): AsyncTask<ITuyaAccessToken> {
  const url: URL = new URL(`${getTuyaApiOrigin(location)}/v1.0/token`);

  url.searchParams.set('grant_type', String(grantType));

  if (code !== void 0) {
    url.searchParams.set('code', code);
  }

  if (terminalId !== void 0) {
    url.searchParams.set('terminal_id', terminalId);
  }

  return fetchTuyaApi<ITuyaAccessTokenJSON>({
    ...options,
    url,
    method: 'GET',
  })
    .successful(normalizeTuyaAccessToken);
}
