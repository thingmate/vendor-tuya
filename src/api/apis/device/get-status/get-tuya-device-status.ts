import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi, IBaseTuyaApiRequestOptions } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';
import { ITuyaDeviceStatusJSON } from './types/tuya-device-status-json.type';

/*
doc: https://developer.tuya.com/en/docs/cloud/f76865b055?id=Kag2ycn1lvwpt
 */

export interface IGetTuyaDeviceStatusOptions extends IBaseTuyaApiRequestOptions {
  deviceId: string;
}

export function getTuyaDeviceStatus(
  {
    location,
    deviceId,
    ...options
  }: IGetTuyaDeviceStatusOptions,
): AsyncTask<ITuyaDeviceStatusJSON[]> {
  const url: URL = new URL(`${getTuyaApiOrigin(location)}/v1.0/iot-03/devices/${deviceId}/status`);

  return fetchTuyaApi<ITuyaDeviceStatusJSON[]>({
    ...options,
    url,
    method: 'GET',
  });
}

