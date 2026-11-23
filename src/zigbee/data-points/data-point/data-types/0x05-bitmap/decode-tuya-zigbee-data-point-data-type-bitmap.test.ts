import { Decoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPointDataTypeBitmap } from './decode-tuya-zigbee-data-point-data-type-bitmap.ts';

describe('decodeTuyaZigbeeDataPointDataTypeBitmap', (): void => {
  test('rejects an invalid bitmap length.', (): void => {
    // a bitmap data point declaring 3 data bytes (valid lengths are 1, 2 or 4), followed by 4 bytes
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x03, 0xaa, 0xbb, 0xcc, 0xdd]));

    expect((): void => {
      decodeTuyaZigbeeDataPointDataTypeBitmap(decoder);
    }).toThrow('Invalid length.');
  });

  test('decodes a 1-byte bitmap.', (): void => {
    // length 0x0001 (1 byte), followed by the bitmap value
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x01, 0xa5]));

    expect(decodeTuyaZigbeeDataPointDataTypeBitmap(decoder)).toEqual({ length: 1, value: 0xa5 });
    expect(decoder.done).toBe(true);
  });

  test('decodes a 2-byte big-endian bitmap.', (): void => {
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x02, 0x12, 0x34]));

    expect(decodeTuyaZigbeeDataPointDataTypeBitmap(decoder)).toEqual({ length: 2, value: 0x1234 });
    expect(decoder.done).toBe(true);
  });

  test('decodes a 4-byte big-endian bitmap.', (): void => {
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x04, 0x12, 0x34, 0x56, 0x78]));

    expect(decodeTuyaZigbeeDataPointDataTypeBitmap(decoder)).toEqual({
      length: 4,
      value: 0x1234_5678,
    });
    expect(decoder.done).toBe(true);
  });
});
