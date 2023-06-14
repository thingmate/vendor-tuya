import { Abortable, asyncFetchJSON, AsyncTask, IAbortableOptions, IAsyncTaskConstraint, IAsyncFetchJSONFunction } from '@lirx/async-task';
import { IHavingAccessToken } from '../types/having-access-token.type';
import { IHavingClientId } from '../types/having-client-id.type';
import { IHavingClientSecret } from '../types/having-client-secret.type';
import { ITuyaApiMethod } from '../types/tuya-api-method.type';
import { ITuyaDataCenterLocation } from './get-tuya-api-origin';
import { signTuyaApiRequest } from './sign-tuya-api-request';

export interface IFetchTuyaApiRequestOptions extends //
  // Omit<ISignTuyaApiRequestOptions, 'timestamp' | 'accessToken'>,
  IHavingClientId,
  IHavingClientSecret,
  Partial<IHavingAccessToken>,
  IAbortableOptions
//
{
  url: URL | string;
  method: ITuyaApiMethod;
  headers?: HeadersInit;
  body?: object;
  fetch?: IAsyncFetchJSONFunction;
}

export interface IFetchTuyaApiResponseSharedJSON {
  success: boolean;
  t: number;
  tid: string;
}

export interface IFetchTuyaApiResponseSuccessJSON<GResult> extends IFetchTuyaApiResponseSharedJSON {
  success: true;
  result: GResult;
}

export interface IFetchTuyaApiResponseErrorJSON extends IFetchTuyaApiResponseSharedJSON {
  success: false;
  code: number; // https://developer.tuya.com/en/docs/iot/error-code?id=K989ruxx88swc
  msg: string;
}

export type IFetchTuyaApiResponseJSON<GResult> =
  | IFetchTuyaApiResponseSuccessJSON<GResult>
  | IFetchTuyaApiResponseErrorJSON
  ;

const EMPTY_HEADERS = new Headers();

export function fetchTuyaApi<GResult extends IAsyncTaskConstraint<GResult>>(
  {
    url,
    method,
    headers = EMPTY_HEADERS,
    body,
    clientId,
    clientSecret,
    accessToken = '',
    fetch = asyncFetchJSON,
    abortable,
  }: IFetchTuyaApiRequestOptions,
): AsyncTask<GResult> {

  const _url: URL = (typeof url === 'string')
    ? new URL(url)
    : url;

  _url.searchParams.sort();

  const _headers: Headers = (headers instanceof Headers)
    ? headers
    : new Headers(headers);

  const _body: string = (body === void 0)
    ? ''
    : JSON.stringify(body);

  const timestamp: number = Date.now();
  const nonce: string = '';

  return signTuyaApiRequest({
    clientId,
    clientSecret,
    accessToken,
    timestamp,
    nonce,
    url: _url,
    method,
    headers: _headers,
    body: _body,
    abortable,
  })
    .successful((signature: string, abortable: Abortable) => {
      const extraHeaders: [string, string][] = [];

      if (!(_headers as any).keys().next().done) {
        let signatureHeaders: string = '';
        const iterator: Iterator<[string, string]> = (_headers as any).entries();
        let result: IteratorResult<[string, string]>;
        while (!(result = iterator.next()).done) {
          if (signatureHeaders.length !== 0) {
            signatureHeaders += ':';
          }
          signatureHeaders += result.value[0];
          extraHeaders.push(result.value);
        }
        extraHeaders.unshift(['Signature-Headers', signatureHeaders]);
      }

      const headers: Headers = new Headers([
        ['Content-Type', 'application/json'],
        ['client_id', clientId],
        ['sign', signature],
        ['sign_method', 'HMAC-SHA256'],
        ['t', timestamp.toString(10)],
        ['access_token', accessToken],
        ...extraHeaders,
      ]);

      const body: string | undefined = (method === 'GET')
        ? void 0
        : _body;

      const request = new Request(url, {
        method,
        headers,
        body,
      });

      return fetch<IFetchTuyaApiResponseJSON<GResult>>(
        request,
        void 0,
        abortable,
      )
        .successful((
          result: IFetchTuyaApiResponseJSON<GResult>,
        ): GResult => {
          if (result.success) {
            return result.result;
          } else {
            switch (result.code) {
              case 1001:
                throw new Error(`Secret invalid: ${result.msg}`);
              case 1010:
                throw new Error(`Token is expired: ${result.msg}`);
              case 1011:
                throw new Error(`Token is invalid: ${result.msg}`);
              default:
                throw new Error(`Unknown error (${result.code}): ${result.msg}`);
            }
          }
        });
    });
}

export interface IBaseTuyaApiRequestOptions extends Omit<IFetchTuyaApiRequestOptions, 'url' | 'method' | 'headers'> {
  location: ITuyaDataCenterLocation;
}

/*---------------*/

// TODO tuya api error => custom error




