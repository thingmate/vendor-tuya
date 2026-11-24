import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPoint } from './decode-tuya-zigbee-data-point.ts';
import { encodeTuyaZigbeeDataPoint } from './encode-tuya-zigbee-data-point.ts';

describe('encodeTuyaZigbeeDataPoint', (): void => {
  test('encodes a raw data point.', (): void => {
    expect(
      Encoder.encode(
        { id: 0x2a, type: 0x00, value: new Uint8Array([0xaa]) },
        encodeTuyaZigbeeDataPoint,
      ),
    ).toEqual(new Uint8Array([0x2a, 0x00, 0x00, 0x01, 0xaa]));
  });

  test('round-trips a boolean data point.', (): void => {
    const dataPoint = { id: 0x01, type: 0x01, value: true } as const;

    const bytes: Uint8Array = Encoder.encode(dataPoint, encodeTuyaZigbeeDataPoint);
    const decoder: Decoder = new Decoder(bytes);

    expect(decodeTuyaZigbeeDataPoint(decoder)).toEqual(dataPoint);
    expect(decoder.done).toBe(true);
  });
});
