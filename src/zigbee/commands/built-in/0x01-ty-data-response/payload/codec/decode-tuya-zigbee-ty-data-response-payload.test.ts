import { Decoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeTyDataResponsePayload } from './decode-tuya-zigbee-ty-data-response-payload.ts';

describe('decodeTuyaZigbeeTyDataResponsePayload', (): void => {
  test('decodes a payload with its sequence number and data points.', (): void => {
    // seq 0x1234 | data point: id 0x01 | type 0x01 (boolean) | length 0x0001 | value 0x01
    const decoder: Decoder = new Decoder(
      new Uint8Array([0x12, 0x34, 0x01, 0x01, 0x00, 0x01, 0x01]),
    );

    expect(decodeTuyaZigbeeTyDataResponsePayload(decoder)).toEqual({
      seq: 0x1234,
      dataPoints: [{ id: 0x01, type: 0x01, value: true }],
    });
    expect(decoder.done).toBe(true);
  });

  test('decodes a payload without data points.', (): void => {
    // seq 0xabcd, no data point
    const decoder: Decoder = new Decoder(new Uint8Array([0xab, 0xcd]));

    expect(decodeTuyaZigbeeTyDataResponsePayload(decoder)).toEqual({
      seq: 0xabcd,
      dataPoints: [],
    });
    expect(decoder.done).toBe(true);
  });
});
