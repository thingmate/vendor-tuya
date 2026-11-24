import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPoints } from './decode-tuya-zigbee-data-points.ts';
import { encodeTuyaZigbeeDataPoints } from './encode-tuya-zigbee-data-points.ts';

const DATA_POINTS = [
  { id: 0x01, type: 0x00, value: new Uint8Array([0xaa]) },
  { id: 0x02, type: 0x02, value: 0x1234_5678 },
  { id: 0x03, type: 0x03, value: 'ok' },
] as const;

describe('encodeTuyaZigbeeDataPoints', (): void => {
  test('encodes consecutive data points back to back.', (): void => {
    expect(Encoder.encode(DATA_POINTS, encodeTuyaZigbeeDataPoints)).toEqual(
      new Uint8Array([
        // id 0x01 | type 0x00 (raw) | length 0x0001 | value 0xaa
        0x01, 0x00, 0x00, 0x01, 0xaa,
        // id 0x02 | type 0x02 (uint32) | length 0x0004 | value 0x12345678
        0x02, 0x02, 0x00, 0x04, 0x12, 0x34, 0x56, 0x78,
        // id 0x03 | type 0x03 (string) | length 0x0002 | value 'ok'
        0x03, 0x03, 0x00, 0x02, 0x6f, 0x6b,
      ]),
    );
  });

  test('round-trips a mixed list of data points.', (): void => {
    const bytes: Uint8Array = Encoder.encode(DATA_POINTS, encodeTuyaZigbeeDataPoints);

    expect(decodeTuyaZigbeeDataPoints(new Decoder(bytes))).toEqual(DATA_POINTS);
  });
});
