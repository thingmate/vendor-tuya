import { Abortable, AsyncTask } from '@lirx/async-task';
import { IOnlineThingProperty } from '@thingmate/wot-scripting-api';
import { getTuyaDeviceDetails } from '../../../api/apis/device/get-details/get-tuya-device-details';
import { ITuyaDeviceDetailsJSON } from '../../../api/apis/device/get-details/types/tuya-device-details-json.type';
import { ITuyaApiContext, ITuyaApiContextFactoryOptions } from '../../../api/helpers/create-tuya-api-context';

export interface ICreateTuyaOnlineThingPropertyOptions {
  context: ITuyaApiContext;
  deviceId: string;
}

export function createTuyaOnlineThingProperty(
  {
    context,
    deviceId,
  }: ICreateTuyaOnlineThingPropertyOptions,
): IOnlineThingProperty {
  const read = (
    abortable: Abortable,
  ): AsyncTask<boolean> => {
    return context((options: ITuyaApiContextFactoryOptions): AsyncTask<ITuyaDeviceDetailsJSON> => {
      return getTuyaDeviceDetails({
        ...options,
        deviceId,
      });
    }, abortable)
      .successful((details: ITuyaDeviceDetailsJSON): boolean => {
        return details.online;
      });
  };

  return {
    read,
  };
}


