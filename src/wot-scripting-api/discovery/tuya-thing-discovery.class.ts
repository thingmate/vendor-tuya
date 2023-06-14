import { Abortable, AsyncTask } from '@lirx/async-task';
import { createPushSourceWithBackPressureFromArray, IPushSourceWithBackPressure } from '@lirx/stream';
import { IPushSinkWithBackPressure } from '@lirx/stream/src/push-sink/push-sink-with-back-pressure.type';
import { IGenericThing, SMART_LIGHT_TD, SMART_PLUG_TD, ThingDiscovery } from '@thingmate/wot-scripting-api';
import { IThingDescription } from '@thingmate/wot-scripting-api/src/thing/thing.class';
import { ITuyaDeviceDetailsJSON } from '../../api/apis/device/get-details/types/tuya-device-details-json.type';
import { getTuyaDeviceList } from '../../api/apis/device/get-device-list/get-tuya-devices-list';
import { ITuyaDeviceListJSON } from '../../api/apis/device/get-device-list/types/tuya-device-list-json.type';
import {
  createTuyaApiContext,
  ICreateTuyaApiContextOptions,
  ITuyaApiContext,
  ITuyaApiContextFactoryOptions,
} from '../../api/helpers/create-tuya-api-context';
import { TuyaSmartLightThing } from '../things/smart-light/tuya-smart-light-thing.class';
import { TuyaSmartPlugThing } from '../things/smart-plug/tuya-smart-plug-thing.class';

export interface ITuyaThingDiscoveryOptions extends ICreateTuyaApiContextOptions {
  tuyaUserId: string;
}

export interface ITuyaThingDiscoveryDiscoverOptions {
  showOffLine?: boolean;
}

export class TuyaThingDiscovery extends ThingDiscovery<ITuyaThingDiscoveryDiscoverOptions | void> {
  constructor(
    {
      tuyaUserId,
      ...options
    }: ITuyaThingDiscoveryOptions,
  ) {
    const tuyaApiContext: ITuyaApiContext = createTuyaApiContext(options);

    const discover = (
      {
        showOffLine = false,
      }: ITuyaThingDiscoveryDiscoverOptions | void = {},
    ): IPushSourceWithBackPressure<IGenericThing> => {
      return (
        sink: IPushSinkWithBackPressure<IGenericThing>,
        abortable: Abortable,
      ): AsyncTask<void> => {
        return tuyaApiContext((options: ITuyaApiContextFactoryOptions): AsyncTask<ITuyaDeviceListJSON> => {
          return getTuyaDeviceList({
            ...options,
            sourceType: 'tuyaUser',
            sourceId: tuyaUserId,
          });
        }, abortable)
          .successful((list: ITuyaDeviceListJSON, abortable: Abortable) => {
            const stream = createPushSourceWithBackPressureFromArray<IGenericThing>(
              list.list
                .map((device: ITuyaDeviceDetailsJSON): IGenericThing | null => {
                  if (device.online || showOffLine) {
                    const sharedTD: IThingDescription = {
                      id: device.uuid,
                      title: device.name,
                      deviceType: device.category,
                      isOnline: device.online,
                    };

                    const createOptions = (
                      td: IThingDescription,
                    ) => {
                      return {
                        description: {
                          ...sharedTD,
                          ...td,
                        },
                        context: tuyaApiContext,
                        deviceId: device.id,
                      };
                    };

                    switch (device.category) {
                      case 'cz':
                        return new TuyaSmartPlugThing(createOptions(SMART_PLUG_TD));
                      case 'dj':
                        return new TuyaSmartLightThing(createOptions(SMART_LIGHT_TD));
                      default:
                        console.error(new Error(`Unsupported type: ${device.category}`));
                        return null;

                    }
                  } else {
                    return null;
                  }
                })
                .filter<IGenericThing>((thing: IGenericThing | null): thing is IGenericThing => {
                  return thing !== null;
                }),
            );

            return stream(sink, abortable);
          });
      };
    };

    super({
      discover,
    });
  }
}
