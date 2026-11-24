import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.ts';
import { type TuyaZigbeeDataPointTypeBitmap } from './tuya-zigbee-data-point-type-bitmap.ts';

/**
 * Encodes a bitmap data point value (big-endian) on the byte size given by `length`.
 */
export function encodeTuyaZigbeeDataPointDataTypeBitmap(
  encoder: Encoder,
  { length, value }: TuyaZigbeeDataPointTypeBitmap,
): void {
  // from zigbee-herdsman-converters => it seems to be a BE number on 1 to 4 bytes
  // https://github.com/arendst/Tasmota/blob/2f7793ddcfa984ab242478388892edb71f37007a/tasmota/tasmota_xdrv_driver/xdrv_23_zigbee_6_0_commands.ino#L562
  encoder.encode(length, encodeTuyaZigbeeDataPointDataLength);
  if (length === 1) {
    encoder.uint8(value);
  } else if (length === 2) {
    encoder.uint16BE(value);
  } else {
    encoder.uint32BE(value);
  }
}
