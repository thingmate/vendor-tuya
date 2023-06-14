import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi, IBaseTuyaApiRequestOptions } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';
import { ITuyaDeviceCommandJSON } from './types/tuya-device-command-json.type';

/*
doc: https://developer.tuya.com/en/docs/cloud/e2512fb901?id=Kag2yag3tiqn5
 */

export interface ISendTuyaDeviceCommandsOptions extends IBaseTuyaApiRequestOptions {
  deviceId: string;
  commands: readonly ITuyaDeviceCommandJSON[];
}

export function sendTuyaDeviceCommands(
  {
    location,
    deviceId,
    commands,
    ...options
  }: ISendTuyaDeviceCommandsOptions,
): AsyncTask<boolean> {
  const url: URL = new URL(`${getTuyaApiOrigin(location)}/v1.0/iot-03/devices/${deviceId}/commands`);

  return fetchTuyaApi<boolean>({
    ...options,
    url,
    method: 'POST',
    body: {
      commands,
    },
  });
}
