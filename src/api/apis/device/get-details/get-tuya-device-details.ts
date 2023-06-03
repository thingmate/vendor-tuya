import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi, IBaseTuyaApiRequestOptions } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';
import { ITuyaDeviceDetailsJSON } from './types/tuya-device-details-json.type';

/*
doc: https://developer.tuya.com/en/docs/cloud/7d3f13ae55?id=Kb2rzcwpmvaci
 */

export interface IGetTuyaDeviceDetailsOptions extends IBaseTuyaApiRequestOptions {
  deviceId: string;
}

export function getTuyaDeviceDetails(
  {
    location,
    deviceId,
    ...options
  }: IGetTuyaDeviceDetailsOptions,
): AsyncTask<ITuyaDeviceDetailsJSON> {
  const url: URL = new URL(`${getTuyaApiOrigin(location)}/v1.1/iot-03/devices/${deviceId}`);

  return fetchTuyaApi<ITuyaDeviceDetailsJSON>({
    ...options,
    url,
    method: 'GET',
  });
}
