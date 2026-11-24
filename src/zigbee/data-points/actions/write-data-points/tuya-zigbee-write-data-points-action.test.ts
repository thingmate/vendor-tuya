import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../test/fake-command-stream/fake-command-stream.ts';
import { decodeTuyaZigbeeTyDataRequestPayload } from '../../../commands/built-in/0x00-ty-data-request/payload/codec/decode-tuya-zigbee-ty-data-request-payload.ts';
import { encodeTuyaZigbeeTyDataResponsePayload } from '../../../commands/built-in/0x01-ty-data-response/payload/codec/encode-tuya-zigbee-ty-data-response-payload.ts';
import { TuyaZigbeeWriteDataPointsAction } from './tuya-zigbee-write-data-points-action.ts';

describe('TuyaZigbeeWriteDataPointsAction', (): void => {
  test('sends the request frame and resolves with the response payload.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const action = new TuyaZigbeeWriteDataPointsAction(stream);
    const payload = {
      seq: 0x1234,
      dataPoints: [{ id: 1, type: 0x01, value: true }],
    } as const;

    const promise = action.call(new AbortController().signal, payload);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x01,
      payload: Encoder.encode(payload, encodeTuyaZigbeeTyDataResponsePayload),
    });

    expect(await promise).toEqual(payload);
    expect(sent).toHaveLength(1);
    expect(Decoder.decode(sent[0].payload, decodeTuyaZigbeeTyDataRequestPayload)).toEqual(payload);
  });
});
