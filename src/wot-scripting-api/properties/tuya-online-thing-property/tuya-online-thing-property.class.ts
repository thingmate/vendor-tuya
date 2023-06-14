import { Abortable, AsyncTask } from '@lirx/async-task';
import { OnlineThingProperty } from '@thingmate/wot-scripting-api';
import { getTuyaDeviceDetails } from '../../../api/apis/device/get-details/get-tuya-device-details';
import { ITuyaDeviceDetailsJSON } from '../../../api/apis/device/get-details/types/tuya-device-details-json.type';
import { ITuyaApiContext, ITuyaApiContextFactoryOptions } from '../../../api/helpers/create-tuya-api-context';

export interface ITuyaOnlineThingPropertyOptions {
  context: ITuyaApiContext;
  deviceId: string;
}

export class TuyaOnlineThingProperty extends OnlineThingProperty {
  constructor(
    {
      context,
      deviceId,
    }: ITuyaOnlineThingPropertyOptions,
  ) {
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

    super({
      read,
      minObserveRefreshTime: 1000 * 10,
    });
  }
}
