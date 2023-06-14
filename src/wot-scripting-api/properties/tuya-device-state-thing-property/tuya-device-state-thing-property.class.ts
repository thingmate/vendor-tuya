import { Abortable, AsyncTask } from '@lirx/async-task';
import { ThingProperty } from '@thingmate/wot-scripting-api';
import { getTuyaDeviceStatus } from '../../../api/apis/device/get-status/get-tuya-device-status';
import { sendTuyaDeviceCommands } from '../../../api/apis/device/send-commands/send-tuya-device-commands';
import { ITuyaApiContext, ITuyaApiContextFactoryOptions } from '../../../api/helpers/create-tuya-api-context';

export interface ITuyaDeviceStateThingPropertyOptions {
  context: ITuyaApiContext;
  deviceId: string;
}

export interface ITuyaDeviceStateEntry {
  code: string;
  value: any;
}

export type ITuyaDeviceStateEntryList = readonly ITuyaDeviceStateEntry[];

export type ITuyaDeviceStateThingProperty = ThingProperty<ITuyaDeviceStateEntryList>;

export class TuyaDeviceStateThingProperty extends ThingProperty<ITuyaDeviceStateEntryList> {
  constructor(
    {
      context,
      deviceId,
    }: ITuyaDeviceStateThingPropertyOptions,
  ) {
    const read = (
      abortable: Abortable,
    ): AsyncTask<ITuyaDeviceStateEntryList> => {
      return context((options: ITuyaApiContextFactoryOptions): AsyncTask<ITuyaDeviceStateEntryList> => {
        return getTuyaDeviceStatus({
          ...options,
          deviceId,
        });
      }, abortable);
    };

    const write = (
      value: ITuyaDeviceStateEntryList,
      abortable: Abortable,
    ): AsyncTask<void> => {
      return context((options: ITuyaApiContextFactoryOptions): AsyncTask<any> => {
        return sendTuyaDeviceCommands({
          ...options,
          deviceId,
          commands: value,
        });
      }, abortable);
    };

    super({
      read,
      write,
      minObserveRefreshTime: 1000 * 10,
    });
  }
}
