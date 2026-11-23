import type { TuyaZigbeeCommandStream } from '../../../../../commands/command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from '../../../data-types/0x02-uint32/tuya-zigbee-data-point-type-uint32.constant.ts';
import {
  TuyaZigbeeDataPointProperty,
  type TuyaZigbeeDataPointPropertyOptions,
} from '../../tuya-zigbee-data-point-property.ts';

export class TuyaZigbeeNumberDataPointProperty extends TuyaZigbeeDataPointProperty<number> {
  constructor(
    stream: TuyaZigbeeCommandStream,
    dataPointId: number,
    options?: TuyaZigbeeDataPointPropertyOptions,
  ) {
    super(stream, dataPointId, TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32, options);
  }
}
