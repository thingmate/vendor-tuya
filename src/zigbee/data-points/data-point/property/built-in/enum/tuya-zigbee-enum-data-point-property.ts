import type { TuyaZigbeeCommandStream } from '../../../../../commands/command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM } from '../../../data-types/0x04-enum/tuya-zigbee-data-point-type-enum.constant.ts';
import {
  TuyaZigbeeDataPointProperty,
  type TuyaZigbeeDataPointPropertyOptions,
} from '../../tuya-zigbee-data-point-property.ts';

/**
 * Read, write and observe view of an enumeration data point.
 */
export class TuyaZigbeeEnumDataPointProperty extends TuyaZigbeeDataPointProperty<number> {
  constructor(
    stream: TuyaZigbeeCommandStream,
    dataPointId: number,
    options?: TuyaZigbeeDataPointPropertyOptions,
  ) {
    super(stream, dataPointId, TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM, options);
  }
}
