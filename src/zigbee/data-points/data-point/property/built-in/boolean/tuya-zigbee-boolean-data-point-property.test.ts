import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../../../test/fake-command-stream/fake-command-stream.ts';
import { decodeTuyaZigbeeTyDataRequestPayload } from '../../../../../commands/built-in/0x00-ty-data-request/payload/codec/decode-tuya-zigbee-ty-data-request-payload.ts';
import { encodeTuyaZigbeeTyDataResponsePayload } from '../../../../../commands/built-in/0x01-ty-data-response/payload/codec/encode-tuya-zigbee-ty-data-response-payload.ts';
import { TuyaZigbeeSequenceGenerator } from '../../../../../sequence/generator/tuya-zigbee-sequence-generator.ts';
import { TuyaZigbeeBooleanDataPointProperty } from './tuya-zigbee-boolean-data-point-property.ts';

describe('TuyaZigbeeBooleanDataPointProperty', (): void => {
  test('writes its value as a boolean (0x01) data point.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const property = new TuyaZigbeeBooleanDataPointProperty(stream, 7, {
      seq: new TuyaZigbeeSequenceGenerator(),
    });

    const promise = property.write.call(new AbortController().signal, true);

    expect(Decoder.decode(sent[0].payload, decodeTuyaZigbeeTyDataRequestPayload)).toEqual({
      seq: 0x0000,
      dataPoints: [{ id: 7, type: 0x01, value: true }],
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
});
