import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataTypeRaw } from '../0x00-raw/encode-tuya-zigbee-data-point-data-type-raw.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_RAW } from '../0x00-raw/tuya-zigbee-data-point-type-raw.constant.ts';
import { encodeTuyaZigbeeDataPointDataTypeBoolean } from '../0x01-boolean/encode-tuya-zigbee-data-point-data-type-boolean.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN } from '../0x01-boolean/tuya-zigbee-data-point-type-boolean.constant.ts';
import { encodeTuyaZigbeeDataPointDataTypeUint32 } from '../0x02-uint32/encode-tuya-zigbee-data-point-data-type-uint32.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from '../0x02-uint32/tuya-zigbee-data-point-type-uint32.constant.ts';
import { encodeTuyaZigbeeDataPointDataTypeString } from '../0x03-string/encode-tuya-zigbee-data-point-data-type-string.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_STRING } from '../0x03-string/tuya-zigbee-data-point-type-string.constant.ts';
import { encodeTuyaZigbeeDataPointDataTypeEnum } from '../0x04-enum/encode-tuya-zigbee-data-point-data-type-enum.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM } from '../0x04-enum/tuya-zigbee-data-point-type-enum.constant.ts';
import { encodeTuyaZigbeeDataPointDataTypeBitmap } from '../0x05-bitmap/encode-tuya-zigbee-data-point-data-type-bitmap.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP } from '../0x05-bitmap/tuya-zigbee-data-point-type-bitmap.constant.ts';
import type { TuyaZigbeeDataPointTypeBitmap } from '../0x05-bitmap/tuya-zigbee-data-point-type-bitmap.ts';
import type { TuyaZigbeeDataPointType } from '../tuya-zigbee-data-point-type.ts';

/**
 * @inheritDoc https://github.com/arendst/Tasmota/blob/2f7793ddcfa984ab242478388892edb71f37007a/tasmota/tasmota_xdrv_driver/xdrv_23_zigbee_6_0_commands.ino#L536
 */
/**
 * Dispatches the encoding of a data point value based on its wire data type.
 */
export function encodeTuyaZigbeeDataPointDataTypeUnknown(
  encoder: Encoder,
  dataType: TuyaZigbeeDataPointType,
  value: unknown,
): void {
  switch (dataType) {
    case TUYA_ZIGBEE_DATA_POINT_TYPE_RAW:
      encodeTuyaZigbeeDataPointDataTypeRaw(encoder, value as Uint8Array);
      break;
    case TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN:
      encodeTuyaZigbeeDataPointDataTypeBoolean(encoder, value as boolean);
      break;
    case TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32:
      encodeTuyaZigbeeDataPointDataTypeUint32(encoder, value as number);
      break;
    case TUYA_ZIGBEE_DATA_POINT_TYPE_STRING:
      encodeTuyaZigbeeDataPointDataTypeString(encoder, value as string);
      break;
    case TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM:
      encodeTuyaZigbeeDataPointDataTypeEnum(encoder, value as number);
      break;
    case TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP:
      encodeTuyaZigbeeDataPointDataTypeBitmap(encoder, value as TuyaZigbeeDataPointTypeBitmap);
      break;
    default:
      throw new Error(`Unsupported tuya data type: ${(dataType as number).toString(10)}.`);
  }
}
