import { AsyncTask, IAbortableOptions } from '@lirx/async-task';
import { IHavingClientSecret } from '../types/having-client-secret.type';

export interface IConvertTuyaClientSecretAsCryptoKeyOptions extends IHavingClientSecret, IAbortableOptions {

}

export function convertTuyaClientSecretAsCryptoKey(
  {
    clientSecret,
    abortable,
  }: IConvertTuyaClientSecretAsCryptoKeyOptions,
): AsyncTask<CryptoKey> {
  return AsyncTask.fromFactory<CryptoKey>((): Promise<CryptoKey> => {
    return crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(clientSecret),
      {
        name: 'HMAC',
        hash: 'SHA-256',
      },
      false,
      ['sign', 'verify'],
    );
  }, abortable);
}

/*------------------*/

const CACHED_KEYS = new Map<string, AsyncTask<CryptoKey>>();

export function convertTuyaClientSecretAsCryptoKeyCached(
  {
    clientSecret,
    abortable,
  }: IConvertTuyaClientSecretAsCryptoKeyOptions,
): AsyncTask<CryptoKey> {
  let key: AsyncTask<CryptoKey> | undefined = CACHED_KEYS.get(clientSecret);
  if (key === void 0) {
    key = convertTuyaClientSecretAsCryptoKey({
      clientSecret,
      abortable,
    });
    CACHED_KEYS.set(clientSecret, key);
  }
  return key!.switchAbortable(abortable);
}
