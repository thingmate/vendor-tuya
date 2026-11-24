import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../../test/fake-command-stream/fake-command-stream.ts';
import { decodeTuyaZigbeeTyDataRequestPayload } from '../../../../commands/built-in/0x00-ty-data-request/payload/codec/decode-tuya-zigbee-ty-data-request-payload.ts';
import { encodeTuyaZigbeeTyDataResponsePayload } from '../../../../commands/built-in/0x01-ty-data-response/payload/codec/encode-tuya-zigbee-ty-data-response-payload.ts';
import { TuyaZigbeeSequenceGenerator } from '../../../../sequence/generator/tuya-zigbee-sequence-generator.ts';
import { TuyaZigbeeWriteDataPointAction } from './tuya-zigbee-write-data-point-action.ts';

describe('TuyaZigbeeWriteDataPointAction', (): void => {
  test('stamps the payload with the next sequence number and resolves with the ack.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const action = new TuyaZigbeeWriteDataPointAction<boolean>(stream, 5, 0x01, {
      seq: new TuyaZigbeeSequenceGenerator(),
    });

    const promise = action.call(new AbortController().signal, true);

    expect(Decoder.decode(sent[0].payload, decodeTuyaZigbeeTyDataRequestPayload)).toEqual({
      seq: 0x0000,
      dataPoints: [{ id: 5, type: 0x01, value: true }],
    });

    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x01,
      payload: Encoder.encode(
        { seq: 0x0000, dataPoints: [] },
        encodeTuyaZigbeeTyDataResponsePayload,
      ),
    });

    await promise;
  });

  test('uses the following sequence number on the next write.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const action = new TuyaZigbeeWriteDataPointAction<boolean>(stream, 5, 0x01, {
      seq: new TuyaZigbeeSequenceGenerator(),
    });

    const first = action.call(new AbortController().signal, true);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x01,
      payload: Encoder.encode(
        { seq: 0x0000, dataPoints: [] },
        encodeTuyaZigbeeTyDataResponsePayload,
      ),
    });
    await first;

    const second = action.call(new AbortController().signal, false);
    expect(Decoder.decode(sent[1].payload, decodeTuyaZigbeeTyDataRequestPayload)).toEqual({
      seq: 0x0001,
      dataPoints: [{ id: 5, type: 0x01, value: false }],
    });
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x01,
      payload: Encoder.encode(
        { seq: 0x0001, dataPoints: [] },
        encodeTuyaZigbeeTyDataResponsePayload,
      ),
    });
    await second;
  });
});
