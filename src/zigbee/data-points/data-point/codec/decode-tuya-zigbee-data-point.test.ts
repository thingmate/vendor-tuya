import { Decoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPoint } from './decode-tuya-zigbee-data-point.ts';

describe('decodeTuyaZigbeeDataPoint', (): void => {
  test('decodes a raw data point.', (): void => {
    // id 0x2a | type 0x00 (raw) | length 0x0001 | value
    const decoder: Decoder = new Decoder(new Uint8Array([0x2a, 0x00, 0x00, 0x01, 0xaa]));

    expect(decodeTuyaZigbeeDataPoint(decoder)).toEqual({
      id: 0x2a,
      type: 0x00,
      value: new Uint8Array([0xaa]),
    });
    expect(decoder.done).toBe(true);
  });

  test('decodes a boolean data point.', (): void => {
    // id 0x01 | type 0x01 (boolean) | length 0x0001 | value 0x01
    const decoder: Decoder = new Decoder(new Uint8Array([0x01, 0x01, 0x00, 0x01, 0x01]));

    expect(decodeTuyaZigbeeDataPoint(decoder)).toEqual({ id: 0x01, type: 0x01, value: true });
    expect(decoder.done).toBe(true);
  });
});
