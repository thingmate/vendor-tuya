import { Abortable, AsyncTask } from '@lirx/async-task';
import { IOnOff, IOnOffThingProperty, onOffFromBoolean, onOffToBoolean } from '@thingmate/wot-scripting-api';
import { getDeviceStatusFromMap } from '../../../api/apis/device/get-status/get-device-status-from-map';
import { getTuyaDeviceStatusAsMap } from '../../../api/apis/device/get-status/get-tuya-device-status-as-map';
import { ITuyaDeviceStatusMap } from '../../../api/apis/device/get-status/tuya-device-status-map.type';
import { sendTuyaDeviceCommands } from '../../../api/apis/device/send-commands/send-tuya-device-commands';
import { ITuyaApiContext, ITuyaApiContextFactoryOptions } from '../../../api/helpers/create-tuya-api-context';

export interface ICreateTuyaOnOffThingPropertyOptions {
  context: ITuyaApiContext;
  deviceId: string;
  onOffCommand: `switch_${number}` | 'switch_led';
}

export function createTuyaOnOffThingProperty(
  {
    context,
    deviceId,
    onOffCommand,
  }: ICreateTuyaOnOffThingPropertyOptions,
): IOnOffThingProperty {
  const read = (
    abortable: Abortable,
  ): AsyncTask<IOnOff> => {
    return context((options: ITuyaApiContextFactoryOptions): AsyncTask<ITuyaDeviceStatusMap> => {
      return getTuyaDeviceStatusAsMap({
        ...options,
        deviceId,
      });
    }, abortable)
      .successful((statusMap: ITuyaDeviceStatusMap): IOnOff => {
        const switchStatus: boolean = getDeviceStatusFromMap(statusMap, onOffCommand);
        return onOffFromBoolean(switchStatus);
      });
  };

  const write = (
    value: IOnOff,
    abortable: Abortable,
  ): AsyncTask<void> => {
    return context((options: ITuyaApiContextFactoryOptions): AsyncTask<any> => {
      return sendTuyaDeviceCommands({
        ...options,
        deviceId,
        commands: [
          {
            code: onOffCommand,
            value: onOffToBoolean(value),
          },
        ],
      });
    }, abortable);
  };

  return {
    read,
    write,
  };
}
