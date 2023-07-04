import { Abortable, AsyncTask, IAbortableOptions } from '@lirx/async-task';
import { createPushSourceWithBackPressureFromArray, IPushSinkWithBackPressure, mapPushPipeWithBackPressure } from '@lirx/stream';
import { IThingDiscovery } from '@thingmate/wot-scripting-api';

import { ITuyaDeviceDetailsJSON } from '../../api/apis/device/get-details/types/tuya-device-details-json.type';
import { getTuyaDeviceList, IGetTuyaDeviceListOptions } from '../../api/apis/device/get-device-list/get-tuya-devices-list';
import { ITuyaDeviceListJSON } from '../../api/apis/device/get-device-list/types/tuya-device-list-json.type';
import {
  createTuyaApiContext,
  ICreateTuyaApiContextOptions,
  ITuyaApiContext,
  ITuyaApiContextFactoryOptions,
} from '../../api/helpers/create-tuya-api-context';
import { createTuyaSmartLightThing } from '../thing/smart-light/create-tuya-smart-light-thing';
import { createTuyaSmartPlugThing } from '../thing/smart-plug/create-tuya-smart-plug-thing';
import { ITuyaGenericThing } from '../thing/types/tuya-generic-thing.type';
import { ITuyaThingDescription } from '../thing/types/tuya-thing-description.type';

export interface ITuyaThingDiscoveryOptions extends ICreateTuyaApiContextOptions {
  tuyaUserId: string;
}

export type ITuyaThingDiscovery = IThingDiscovery<ITuyaGenericThing>;

export function createTuyaThingDiscovery(
  {
    tuyaUserId,
    ...options
  }: ITuyaThingDiscoveryOptions,
): ITuyaThingDiscovery {
  const tuyaApiContext: ITuyaApiContext = createTuyaApiContext(options);

  const _getTuyaDeviceList = (
    {
      abortable,
      ..._options
    }: Omit<IGetTuyaDeviceListOptions, keyof ITuyaApiContextFactoryOptions | 'sourceType' | 'sourceId'> & IAbortableOptions,
  ): AsyncTask<ITuyaDeviceListJSON> => {
    return tuyaApiContext((options: ITuyaApiContextFactoryOptions): AsyncTask<ITuyaDeviceListJSON> => {
      return getTuyaDeviceList({
        ...options,
        ..._options,
        sourceType: 'tuyaUser',
        sourceId: tuyaUserId,
        pageSize: 100,
      });
    }, abortable);
  };

  const convertTuyaDeviceDetailsJSONToTuyaThingDescription = (
    device: ITuyaDeviceDetailsJSON,
  ): ITuyaThingDescription => {
    return {
      id: device.uuid,
      title: device.name,
      deviceType: device.category,
      online: device.online,
    };
  };

  const convertTuyaDeviceDetailsJSONToTuyaGenericThing = (
    device: ITuyaDeviceDetailsJSON,
  ): ITuyaGenericThing => {
    const options = {
      description: convertTuyaDeviceDetailsJSONToTuyaThingDescription(device),
      context: tuyaApiContext,
      deviceId: device.id,
    };

    switch (device.category) {
      case 'cz':
        return createTuyaSmartPlugThing(options);
      case 'dj':
        return createTuyaSmartLightThing(options);
      default:
        throw new Error(`Unsupported type: ${device.category}`);
    }
  };

  const discover = (
    sink: IPushSinkWithBackPressure<ITuyaGenericThing>,
    abortable: Abortable,
  ): AsyncTask<void> => {
    const loop = (
      lastRowKey: string | undefined,
      abortable: Abortable,
    ): AsyncTask<void> => {
      return _getTuyaDeviceList({
        abortable,
        lastRowKey,
      })
        .successful((list: ITuyaDeviceListJSON, abortable: Abortable): AsyncTask<void> => {
          const devices$ = mapPushPipeWithBackPressure(
            createPushSourceWithBackPressureFromArray(list.list),
            convertTuyaDeviceDetailsJSONToTuyaGenericThing,
          );

          return devices$(sink, abortable)
            .successful((_, abortable: Abortable) => {
              return list.has_more
                ? loop(list.last_row_key, abortable)
                : void 0;
            });
        });
    };

    return loop(void 0, abortable);
  };

  return {
    discover,
  };
}
