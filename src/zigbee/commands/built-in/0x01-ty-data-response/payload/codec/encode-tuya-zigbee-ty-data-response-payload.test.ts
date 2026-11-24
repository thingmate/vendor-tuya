import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeTyDataResponsePayload } from './decode-tuya-zigbee-ty-data-response-payload.ts';
import { encodeTuyaZigbeeTyDataResponsePayload } from './encode-tuya-zigbee-ty-data-response-payload.ts';

describe('encodeTuyaZigbeeTyDataResponsePayload', (): void => {
  test('encodes the sequence number followed by the data points.', (): void => {
    expect(
      Encoder.encode(
        { seq: 0x1234, dataPoints: [{ id: 0x01, type: 0x01, value: true }] },
        encodeTuyaZigbeeTyDataResponsePayload,
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

    const bytes: Uint8Array = Encoder.encode(payload, encodeTuyaZigbeeTyDataResponsePayload);
    const decoder: Decoder = new Decoder(bytes);

    expect(decodeTuyaZigbeeTyDataResponsePayload(decoder)).toEqual(payload);
    expect(decoder.done).toBe(true);
  });
});
