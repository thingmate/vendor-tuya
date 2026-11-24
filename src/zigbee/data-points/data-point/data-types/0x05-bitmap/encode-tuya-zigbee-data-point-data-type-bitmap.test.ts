import { Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { encodeTuyaZigbeeDataPointDataTypeBitmap } from './encode-tuya-zigbee-data-point-data-type-bitmap.ts';

describe('encodeTuyaZigbeeDataPointDataTypeBitmap', (): void => {
  test('encodes a 1-byte bitmap.', (): void => {
    expect(
      Encoder.encode({ length: 1, value: 0xa5 }, encodeTuyaZigbeeDataPointDataTypeBitmap),
    ).toEqual(new Uint8Array([0x00, 0x01, 0xa5]));
  });

  test('encodes a 2-byte big-endian bitmap.', (): void => {
    expect(
      Encoder.encode({ length: 2, value: 0x1234 }, encodeTuyaZigbeeDataPointDataTypeBitmap),
    ).toEqual(new Uint8Array([0x00, 0x02, 0x12, 0x34]));
  });

  test('encodes a 4-byte big-endian bitmap.', (): void => {
    expect(
      Encoder.encode({ length: 4, value: 0x1234_5678 }, encodeTuyaZigbeeDataPointDataTypeBitmap),
    ).toEqual(new Uint8Array([0x00, 0x04, 0x12, 0x34, 0x56, 0x78]));
  });
});
