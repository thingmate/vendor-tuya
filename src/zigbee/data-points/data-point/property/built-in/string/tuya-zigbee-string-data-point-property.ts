import type { TuyaZigbeeCommandStream } from '../../../../../commands/command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_STRING } from '../../../data-types/0x03-string/tuya-zigbee-data-point-type-string.constant.ts';
import {
  TuyaZigbeeDataPointProperty,
  type TuyaZigbeeDataPointPropertyOptions,
} from '../../tuya-zigbee-data-point-property.ts';

export class TuyaZigbeeStringDataPointProperty extends TuyaZigbeeDataPointProperty<string> {
  constructor(
    stream: TuyaZigbeeCommandStream,
    dataPointId: number,
    options?: TuyaZigbeeDataPointPropertyOptions,
  ) {
    super(stream, dataPointId, TUYA_ZIGBEE_DATA_POINT_TYPE_STRING, options);
  }
}
