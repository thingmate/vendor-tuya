import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi, IBaseTuyaApiRequestOptions } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';
import { normalizeTuyaDeviceSpecification } from './types/tuya-device-specification/normalize-tuya-device-specification';
import { ITuyaDeviceSpecificationJSON } from './types/tuya-device-specification/tuya-device-specification-json.type';
import { ITuyaDeviceSpecification } from './types/tuya-device-specification/tuya-device-specification.type';

/*
doc: https://developer.tuya.com/en/docs/cloud/68c2e82f73?id=Kag2ybtxwlb9w
 */

export interface IGetTuyaDeviceSpecificationOptions extends IBaseTuyaApiRequestOptions {
  deviceId: string;
}

export function getTuyaDeviceSpecification(
  {
    location,
    deviceId,
    ...options
  }: IGetTuyaDeviceSpecificationOptions,
): AsyncTask<ITuyaDeviceSpecification> {
  const url: URL = new URL(`${getTuyaApiOrigin(location)}/v1.0/iot-03/devices/${deviceId}/specification`);

  return fetchTuyaApi<ITuyaDeviceSpecificationJSON>({
    ...options,
    url,
    method: 'GET',
  })
    .successful(normalizeTuyaDeviceSpecification);
}
