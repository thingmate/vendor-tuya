import { Decoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPointDataTypeRaw } from './decode-tuya-zigbee-data-point-data-type-raw.ts';

describe('decodeTuyaZigbeeDataPointDataTypeRaw', (): void => {
  test('decodes the raw bytes following the 2-byte big-endian length prefix.', (): void => {
    // length 0x0002 (2 bytes), followed by the raw value bytes
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x02, 0xaa, 0xbb]));

    expect(decodeTuyaZigbeeDataPointDataTypeRaw(decoder)).toEqual(new Uint8Array([0xaa, 0xbb]));
    expect(decoder.done).toBe(true);
  });

  test('decodes an empty raw value.', (): void => {
    // length 0x0000, without value bytes
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x00]));

    expect(decodeTuyaZigbeeDataPointDataTypeRaw(decoder)).toEqual(new Uint8Array([]));
    expect(decoder.done).toBe(true);
  });
});
