import { PropertyAbilities } from '@thingmate/abilities';
import { cachedInstance } from '@xstd/deep-map';
import type { TuyaZigbeeCommandStream } from '../../../commands/command/tuya-zigbee-command.ts';
import { TuyaZigbeeDataPointObserver } from '../actions/observe-data-point/tuya-zigbee-data-point-observer.ts';
import { TuyaZigbeeReadDataPointAction } from '../actions/read-data-point/tuya-zigbee-read-data-point-action.ts';
import {
  TuyaZigbeeWriteDataPointAction,
  type TuyaZigbeeWriteDataPointActionOptions,
} from '../actions/write-data-point/tuya-zigbee-write-data-point-action.ts';
import type { TuyaZigbeeDataPointType } from '../data-types/tuya-zigbee-data-point-type.ts';

export interface TuyaZigbeeDataPointPropertyOptions extends TuyaZigbeeWriteDataPointActionOptions {}

export class TuyaZigbeeDataPointProperty<GValue> extends PropertyAbilities<GValue> {
  constructor(
    stream: TuyaZigbeeCommandStream,
    dataPointId: number,
    dataPointType: TuyaZigbeeDataPointType,
    options?: TuyaZigbeeDataPointPropertyOptions,
  ) {
    super({
      read: cachedInstance(TuyaZigbeeReadDataPointAction<GValue>, stream, dataPointId),
      write: cachedInstance(
        TuyaZigbeeWriteDataPointAction<GValue>,
        stream,
        dataPointId,
        dataPointType,
        options,
      ),
      observe: cachedInstance(TuyaZigbeeDataPointObserver<GValue>, stream, dataPointId).observe,
    });
  }
}
