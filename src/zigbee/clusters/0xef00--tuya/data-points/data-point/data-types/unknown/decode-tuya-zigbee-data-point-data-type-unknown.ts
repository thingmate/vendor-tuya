import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataTypeRaw } from '../0x00--raw/decode-tuya-zigbee-data-point-data-type-raw.js';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_RAW } from '../0x00--raw/tuya-zigbee-data-point-type-raw.constant.js';
import { decodeTuyaZigbeeDataPointDataTypeBoolean } from '../0x01--boolean/decode-tuya-zigbee-data-point-data-type-boolean.js';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN } from '../0x01--boolean/tuya-zigbee-data-point-type-boolean.constant.js';
import { decodeTuyaZigbeeDataPointDataTypeUint32 } from '../0x02--uint32/decode-tuya-zigbee-data-point-data-type-uint32.js';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from '../0x02--uint32/tuya-zigbee-data-point-type-uint32.constant.js';
import { decodeTuyaZigbeeDataPointDataTypeString } from '../0x03--string/decode-tuya-zigbee-data-point-data-type-string.js';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_STRING } from '../0x03--string/tuya-zigbee-data-point-type-string.constant.js';
import { decodeTuyaZigbeeDataPointDataTypeEnum } from '../0x04--enum/decode-tuya-zigbee-data-point-data-type-enum.js';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM } from '../0x04--enum/tuya-zigbee-data-point-type-enum.constant.js';
import { decodeTuyaZigbeeDataPointDataTypeBitmap } from '../0x05--bitmap/decode-tuya-zigbee-data-point-data-type-bitmap.js';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP } from '../0x05--bitmap/tuya-zigbee-data-point-type-bitmap.constant.js';
import { TuyaZigbeeDataPointType } from '../tuya-zigbee-data-point-type.js';

export function decodeTuyaZigbeeDataPointDataTypeUnknown(
  decoder: Decoder,
  dataType: TuyaZigbeeDataPointType,
): unknown {
  switch (dataType) {
    case TUYA_ZIGBEE_DATA_POINT_TYPE_RAW:
      return decodeTuyaZigbeeDataPointDataTypeRaw(decoder);
    case TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN:
      return decodeTuyaZigbeeDataPointDataTypeBoolean(decoder);
    case TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32:
      return decodeTuyaZigbeeDataPointDataTypeUint32(decoder);
    case TUYA_ZIGBEE_DATA_POINT_TYPE_STRING:
      return decodeTuyaZigbeeDataPointDataTypeString(decoder);
    case TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM:
      return decodeTuyaZigbeeDataPointDataTypeEnum(decoder);
    case TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP:
      return decodeTuyaZigbeeDataPointDataTypeBitmap(decoder);
    default:
      throw new Error(`Unsupported tuya data type: ${(dataType as number).toString(10)}.`);
  }
}
