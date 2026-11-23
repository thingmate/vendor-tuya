import { Decoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPoints } from './decode-tuya-zigbee-data-points.ts';

describe('decodeTuyaZigbeeDataPoints', (): void => {
  test('decodes consecutive data points until the decoder is done.', (): void => {
    // data point 1: id 0x01 | type 0x00 (raw) | length 0x0001 | value 0xaa
    // data point 2: id 0x02 | type 0x01 (boolean) | length 0x0001 | value 0x01
    const decoder: Decoder = new Decoder(
      new Uint8Array([0x01, 0x00, 0x00, 0x01, 0xaa, 0x02, 0x01, 0x00, 0x01, 0x01]),
    );

    expect(decodeTuyaZigbeeDataPoints(decoder)).toEqual([
      { id: 0x01, type: 0x00, value: new Uint8Array([0xaa]) },
      { id: 0x02, type: 0x01, value: true },
    ]);
    expect(decoder.done).toBe(true);
  });

  test('decodes no data point from an empty payload.', (): void => {
    expect(decodeTuyaZigbeeDataPoints(new Decoder(new Uint8Array([])))).toEqual([]);
  });
});
