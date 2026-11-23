import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeTyDataRequestPayload } from './decode-tuya-zigbee-ty-data-request-payload.ts';
import { encodeTuyaZigbeeTyDataRequestPayload } from './encode-tuya-zigbee-ty-data-request-payload.ts';

describe('encodeTuyaZigbeeTyDataRequestPayload', (): void => {
  test('encodes the sequence number followed by the data points.', (): void => {
    expect(
      Encoder.encode(
        { seq: 0x1234, dataPoints: [{ id: 0x01, type: 0x01, value: true }] },
        encodeTuyaZigbeeTyDataRequestPayload,
      ),
    ).toEqual(new Uint8Array([0x12, 0x34, 0x01, 0x01, 0x00, 0x01, 0x01]));
  });

  test('round-trips a payload with several data points.', (): void => {
    const payload = {
      seq: 0xffff,
      dataPoints: [
        { id: 0x01, type: 0x02, value: 0x1234_5678 },
        { id: 0x02, type: 0x03, value: 'on' },
      ],
    } as const;

    const bytes: Uint8Array = Encoder.encode(payload, encodeTuyaZigbeeTyDataRequestPayload);
    const decoder: Decoder = new Decoder(bytes);

    expect(decodeTuyaZigbeeTyDataRequestPayload(decoder)).toEqual(payload);
    expect(decoder.done).toBe(true);
  });
});
