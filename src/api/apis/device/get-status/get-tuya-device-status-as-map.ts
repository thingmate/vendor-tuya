import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';
import { generateTuyaDeviceStatusMap } from './generate-tuya-device-status-map';
import { getTuyaDeviceStatus, IGetTuyaDeviceStatusOptions } from './get-tuya-device-status';
import { ITuyaDeviceStatusMap } from './tuya-device-status-map.type';
import { ITuyaDeviceStatusJSON } from './types/tuya-device-status-json.type';

export function getTuyaDeviceStatusAsMap(
  options: IGetTuyaDeviceStatusOptions,
): AsyncTask<ITuyaDeviceStatusMap> {
  return getTuyaDeviceStatus(options)
    .successful(generateTuyaDeviceStatusMap);
}

