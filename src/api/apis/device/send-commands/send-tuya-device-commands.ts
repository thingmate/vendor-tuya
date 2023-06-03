import { AsyncTask } from '@lirx/async-task';
import { fetchTuyaApi, IBaseTuyaApiRequestOptions } from '../../../helpers/fetch-tuya-api';
import { getTuyaApiOrigin } from '../../../helpers/get-tuya-api-origin';

/*
doc: https://developer.tuya.com/en/docs/cloud/e2512fb901?id=Kag2yag3tiqn5
 */

export interface ISendTuyaDeviceCommandsOptions extends IBaseTuyaApiRequestOptions {
  deviceId: string;
  commands: readonly any[];
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
