import type { TuyaZigbeeCommandStream } from '../../../../../commands/command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN } from '../../../data-types/0x01-boolean/tuya-zigbee-data-point-type-boolean.constant.ts';
import {
  TuyaZigbeeDataPointProperty,
  type TuyaZigbeeDataPointPropertyOptions,
} from '../../tuya-zigbee-data-point-property.ts';

export class TuyaZigbeeBooleanDataPointProperty extends TuyaZigbeeDataPointProperty<boolean> {
  constructor(
    stream: TuyaZigbeeCommandStream,
    dataPointId: number,
    options?: TuyaZigbeeDataPointPropertyOptions,
  ) {
    super(stream, dataPointId, TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN, options);
  }
}
