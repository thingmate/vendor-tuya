import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeTyDataReportPayload } from './decode-tuya-zigbee-ty-data-report-payload.ts';
import { encodeTuyaZigbeeTyDataReportPayload } from './encode-tuya-zigbee-ty-data-report-payload.ts';

describe('encodeTuyaZigbeeTyDataReportPayload', (): void => {
  test('encodes the sequence number followed by the data points.', (): void => {
    expect(
      Encoder.encode(
        { seq: 0x1234, dataPoints: [{ id: 0x01, type: 0x01, value: true }] },
        encodeTuyaZigbeeTyDataReportPayload,
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

    const bytes: Uint8Array = Encoder.encode(payload, encodeTuyaZigbeeTyDataReportPayload);
    const decoder: Decoder = new Decoder(bytes);

    expect(decodeTuyaZigbeeTyDataReportPayload(decoder)).toEqual(payload);
    expect(decoder.done).toBe(true);
  });
});
