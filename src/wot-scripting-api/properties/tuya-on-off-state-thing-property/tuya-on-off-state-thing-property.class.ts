import { Abortable, AsyncTask } from '@lirx/async-task';
import { IOnOffState, onOffStateFromBoolean, OnOffStateThingProperty, onOffStateToBoolean } from '@thingmate/wot-scripting-api';
import { getDeviceStatusFromMap } from '../../../api/apis/device/get-status/get-device-status-from-map';
import { getTuyaDeviceStatusAsMap } from '../../../api/apis/device/get-status/get-tuya-device-status-as-map';
import { ITuyaDeviceStatusMap } from '../../../api/apis/device/get-status/tuya-device-status-map.type';
import { sendTuyaDeviceCommands } from '../../../api/apis/device/send-commands/send-tuya-device-commands';
import { ITuyaApiContext, ITuyaApiContextFactoryOptions } from '../../../api/helpers/create-tuya-api-context';

export interface ITuyaOnOffStateThingPropertyOptions {
  context: ITuyaApiContext;
  deviceId: string;
  onOffCommand: `switch_${number}` | 'switch_led';
}

export class TuyaOnOffStateThingProperty extends OnOffStateThingProperty {
  constructor(
    {
      context,
      deviceId,
      onOffCommand,
    }: ITuyaOnOffStateThingPropertyOptions,
  ) {
    const read = (
      abortable: Abortable,
    ): AsyncTask<IOnOffState> => {
      return context((options: ITuyaApiContextFactoryOptions): AsyncTask<ITuyaDeviceStatusMap> => {
        return getTuyaDeviceStatusAsMap({
          ...options,
          deviceId,
        });
      }, abortable)
        .successful((statusMap: ITuyaDeviceStatusMap): IOnOffState => {
          const switchStatus: boolean = getDeviceStatusFromMap(statusMap, onOffCommand);
          return onOffStateFromBoolean(switchStatus);
        });
    };

    const write = (
      value: IOnOffState,
      abortable: Abortable,
    ): AsyncTask<void> => {
      return context((options: ITuyaApiContextFactoryOptions): AsyncTask<any> => {
        return sendTuyaDeviceCommands({
          ...options,
          deviceId,
          commands: [
            {
              code: onOffCommand,
              value: onOffStateToBoolean(value),
            },
          ],
        });
      }, abortable);
    };

    super({
      read,
      write,
      minObserveRefreshTime: 10000,
    });
  }

}
