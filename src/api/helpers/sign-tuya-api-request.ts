import { Abortable, AsyncTask, IAbortableOptions } from '@lirx/async-task';
import { convertArrayBufferToHexString } from '../../misc/convert-array-buffer-to-hex-string';
import { convertArrayBufferToUpperCaseHexString } from '../../misc/convert-array-buffer-to-upper-case-hex-string';
import { IHavingAccessToken } from '../types/having-access-token.type';
import { IHavingClientId } from '../types/having-client-id.type';
import { IHavingNonce } from '../types/having-nonce.type';
import { IHavingTimestamp } from '../types/having-timestamp.type';
import { ITuyaApiMethod } from '../types/tuya-api-method.type';
import {
  convertTuyaClientSecretAsCryptoKeyCached,
  IConvertTuyaClientSecretAsCryptoKeyOptions,
} from './convert-tuya-client-secret-as-crypto-key';

/*
Doc: https://developer.tuya.com/en/docs/iot/new-singnature?id=Kbw0q34cs2e5g
 */

export interface ISignTuyaApiRequestOptions extends IConvertTuyaClientSecretAsCryptoKeyOptions, IGetTuyaApiBytesToSignOptions {
}

export function signTuyaApiRequest(
  {
    abortable,
    ...options
  }: ISignTuyaApiRequestOptions,
): AsyncTask<string> {
  return AsyncTask.all([
    (abortable: Abortable): AsyncTask<CryptoKey> => {
      return convertTuyaClientSecretAsCryptoKeyCached({
        ...options,
        abortable,
      });
    },
    (abortable: Abortable): AsyncTask<Uint8Array> => {
      return getTuyaApiBytesToSign({
        ...options,
        abortable,
      });
    },
  ], abortable)
    .successful(([key, bytes]: [CryptoKey, Uint8Array]): Promise<string> => {
      return crypto.subtle.sign(
        'HMAC',
        key,
        bytes,
      )
        .then(convertArrayBufferToUpperCaseHexString);
    });

}

/*----------*/

export interface IGetTuyaApiBytesToSignOptions extends //
  IHavingClientId,
  Partial<IHavingAccessToken>,
  IHavingTimestamp,
  Partial<IHavingNonce>,
  IAbortableOptions
//
{
  url: URL;
  method: ITuyaApiMethod;
  headers: Headers;
  body: string;
}

export function getTuyaApiBytesToSign(
  {
    clientId,
    accessToken = '',
    timestamp,
    nonce = '',
    url,
    method,
    headers,
    body,
    abortable,
  }: IGetTuyaApiBytesToSignOptions,
): AsyncTask<Uint8Array> {
  return AsyncTask.fromFactory<ArrayBuffer>((): Promise<ArrayBuffer> => {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
  }, abortable)
    .successful((hashedBody: ArrayBuffer): Uint8Array => {
      const _headers: string = Array.from<[string, string]>((headers as any).entries() as Iterable<[string, string]>)
        .reduce((str: string, [key, value]: [string, string]): string => {
          return str + key + ':' + value + '\n';
        }, '');

      const _url: string = url.pathname
        + url.search
      ;

      const stringToSign: string =
        method + '\n'
        + convertArrayBufferToHexString(hashedBody) + '\n'
        + _headers + '\n'
        + _url
      ;

      return new TextEncoder().encode(clientId + accessToken + timestamp + nonce + stringToSign);
    });

}

