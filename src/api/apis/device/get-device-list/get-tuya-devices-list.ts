import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi, IBaseTuyaApiRequestOptions } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';
import { ITuyaDeviceListJSON } from './types/tuya-device-list-json.type';

/*
doc: https://developer.tuya.com/en/docs/cloud/dc413408fe?id=Kc09y2ons2i3b
 */

export type IGetTuyaDeviceListSourceType =
  | 'asset'
  | 'homeApp'
  | 'tuyaUser'
  | 'product'
  ;

export interface IGetTuyaDeviceListOptions extends IBaseTuyaApiRequestOptions {
  sourceType?: IGetTuyaDeviceListSourceType;
  sourceId?: string;
  category?: string;
  lastRowKey?: string;
  pageSize?: number; // max 200
}

export function getTuyaDeviceList(
  {
    location,
    sourceType,
    sourceId,
    category,
    lastRowKey,
    pageSize,
    ...options
  }: IGetTuyaDeviceListOptions,
): AsyncTask<ITuyaDeviceListJSON> {
  const url: URL = new URL(`${getTuyaApiOrigin(location)}/v1.3/iot-03/devices`);

  if (sourceType !== void 0) {
    url.searchParams.set('source_type', sourceType);
  }

  if (sourceId !== void 0) {
    url.searchParams.set('source_id', sourceId);
  }

  if (category !== void 0) {
    url.searchParams.set('category', category);
  }

  if (lastRowKey !== void 0) {
    url.searchParams.set('last_row_key', lastRowKey);
  }

  if (pageSize !== void 0) {
    url.searchParams.set('page_size', String(pageSize));
  }

  return fetchTuyaApi<ITuyaDeviceListJSON>({
    ...options,
    url,
    method: 'GET',
  });
}
