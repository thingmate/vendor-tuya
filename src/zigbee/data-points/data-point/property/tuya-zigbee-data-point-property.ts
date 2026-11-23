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

/**
 * Options of the data point property, forwarded to its write action.
 */
export interface TuyaZigbeeDataPointPropertyOptions extends TuyaZigbeeWriteDataPointActionOptions {}

/**
 * Read, write and observe view of a single Tuya data point.
 *
 * `read` queries the device and resolves with the reported value, `write` sends
 * the value and awaits the acknowledgement, and `observe` emits the values the
 * device reports for this data point.
 */
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
