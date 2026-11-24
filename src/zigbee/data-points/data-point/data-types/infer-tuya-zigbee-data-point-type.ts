import { TUYA_ZIGBEE_DATA_POINT_TYPE_RAW } from './0x00-raw/tuya-zigbee-data-point-type-raw.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN } from './0x01-boolean/tuya-zigbee-data-point-type-boolean.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from './0x02-uint32/tuya-zigbee-data-point-type-uint32.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_STRING } from './0x03-string/tuya-zigbee-data-point-type-string.constant.ts';
import { type TuyaZigbeeDataPointType } from './tuya-zigbee-data-point-type.ts';

/**
 * Infers the wire data type of a data point from a JavaScript value:
 * `Uint8Array` to raw, `boolean` to boolean, non-negative integer to uint32,
 * `string` to string.
 * @throws RangeError when a number is not a uint32.
 * @throws Error for any other value type.
 */
export function inferTuyaZigbeeDataPointType(value: unknown): TuyaZigbeeDataPointType {
  if (value instanceof Uint8Array) {
    return TUYA_ZIGBEE_DATA_POINT_TYPE_RAW; // raw
  }

  switch (typeof value) {
    case 'boolean':
      return TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN; // boolean
    case 'number': {
      if (!Number.isInteger(value) || value < 0 || value > 0xffff_ffff) {
        throw new RangeError('Only uint32 number is supported.');
      } else {
        return TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32; // value (uint32, be)
      }
    }
    case 'string':
      return TUYA_ZIGBEE_DATA_POINT_TYPE_STRING; // string
    default:
      throw new Error("Unable to infer value's type.");
  }
}
