import { Abortable, AsyncTask, IAsyncTaskConstraint } from '@lirx/async-task';
import { getTuyaAccessToken } from './api/apis/token/get/get-tuya-access-token';
import { refreshTuyaAccessToken } from './api/apis/token/refresh/refresh-tuya-access-token';
import { ITuyaAccessToken } from './api/apis/token/types/tuya-access-token/tuya-access-token.type';
import { IBaseTuyaApiRequestOptions } from './api/helpers/fetch-tuya-api';

export interface ITuyaApiContextFactoryOptions extends IBaseTuyaApiRequestOptions {
}

export interface ITuyaApiContextFactory<GReturn extends IAsyncTaskConstraint<GReturn>> {
  (
    options: ITuyaApiContextFactoryOptions,
  ): AsyncTask<GReturn>;
}

export interface ITuyaApiContext {
  <GReturn extends IAsyncTaskConstraint<GReturn>>(
    factory: ITuyaApiContextFactory<GReturn>,
    abortable: Abortable,
  ): AsyncTask<GReturn>;
}

export interface ICreateTuyaApiContextOptions extends Omit<IBaseTuyaApiRequestOptions, 'abortable'> {

}

export function createTuyaApiContext(
  options: ICreateTuyaApiContextOptions,
): ITuyaApiContext {
  let token: AsyncTask<ITuyaAccessToken>;
  const tokenAbortable: Abortable = Abortable.never;

  const initToken = (): AsyncTask<ITuyaAccessToken> => {
    return token = getTuyaAccessToken({
      ...options,
      abortable: tokenAbortable,
    });
  };

  const refreshToken = (
    refreshToken: string,
  ): AsyncTask<ITuyaAccessToken> => {
    return token = refreshTuyaAccessToken({
      ...options,
      refreshToken,
      abortable: tokenAbortable,
    });
  };

  const getValidToken = (): AsyncTask<ITuyaAccessToken> => {
    if (token === void 0) {
      return initToken();
    } else {
      return token.successful((token: ITuyaAccessToken): AsyncTask<ITuyaAccessToken> | ITuyaAccessToken => {
        if ((token.expireDate - 5000) < Date.now()) {
          return refreshToken(token.refreshToken);
        } else {
          return token;
        }
      });
    }
  };

  return <GReturn extends IAsyncTaskConstraint<GReturn>>(
    factory: ITuyaApiContextFactory<GReturn>,
    abortable: Abortable,
  ): AsyncTask<GReturn> => {
    return getValidToken()
      .switchAbortable(abortable)
      .successful((token: ITuyaAccessToken, abortable: Abortable): AsyncTask<GReturn> => {
        return factory({
          ...options,
          accessToken: token.accessToken,
          abortable,
        });
      })
      .errored((error: unknown, abortable: Abortable): never => {
        throw error;
      });
  };
}
