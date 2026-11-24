import { Decoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPointDataTypeUint32 } from './decode-tuya-zigbee-data-point-data-type-uint32.ts';

describe('decodeTuyaZigbeeDataPointDataTypeUint32', (): void => {
  test('decodes a big-endian uint32 value.', (): void => {
    // length 0x0004 (4 bytes), followed by 0x80000000 big-endian
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x04, 0x80, 0x00, 0x00, 0x00]));

    expect(decodeTuyaZigbeeDataPointDataTypeUint32(decoder)).toBe(0x8000_0000);
    expect(decoder.done).toBe(true);
  });

  test('decodes the maximum uint32 value.', (): void => {
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x04, 0xff, 0xff, 0xff, 0xff]));

    expect(decodeTuyaZigbeeDataPointDataTypeUint32(decoder)).toBe(0xffff_ffff);
    expect(decoder.done).toBe(true);
  });

  test('rejects a length other than 4.', (): void => {
    // length 0x0002 (2 bytes), followed by 2 value bytes
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x02, 0x00, 0x01]));

    expect((): void => {
      decodeTuyaZigbeeDataPointDataTypeUint32(decoder);
    }).toThrow('Invalid length.');
  });
});
