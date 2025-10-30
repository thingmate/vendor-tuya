import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.js';
import {
  type TuyaZigbeeDataPointTypeBitmap,
  type TuyaZigbeeDataPointTypeBitmapLength,
} from './tuya-zigbee-data-point-type-bitmap.js';

export function decodeTuyaZigbeeDataPointDataTypeBitmap(
  decoder: Decoder,
): TuyaZigbeeDataPointTypeBitmap {
  const length: TuyaZigbeeDataPointTypeBitmapLength = decodeTuyaZigbeeDataPointDataLength(
    decoder,
  ) as TuyaZigbeeDataPointTypeBitmapLength;
  let value: number;
  if (length === 1) {
    value = decoder.uint8();
  } else if (length === 2) {
    value = decoder.uint16BE();
  } else {
    value = decoder.uint32BE();
  }

  return {
    length,
    value,
  };
}
