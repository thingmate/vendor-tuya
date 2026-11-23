import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.ts';
import {
  type TuyaZigbeeDataPointTypeBitmap,
  type TuyaZigbeeDataPointTypeBitmapLength,
} from './tuya-zigbee-data-point-type-bitmap.ts';

/**
 * Decodes a bitmap data point value (big-endian), rejecting any length other
 * than 1, 2 or 4.
 */
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
  } else if (length === 4) {
    value = decoder.uint32BE();
  } else {
    throw new Error('Invalid length.');
  }

  return {
    length,
    value,
  };
}
