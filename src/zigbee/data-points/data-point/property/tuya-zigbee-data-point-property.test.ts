import { Decoder, Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../test/fake-command-stream/fake-command-stream.ts';
import { decodeTuyaZigbeeTyDataRequestPayload } from '../../../commands/built-in/0x00-ty-data-request/payload/codec/decode-tuya-zigbee-ty-data-request-payload.ts';
import { encodeTuyaZigbeeTyDataResponsePayload } from '../../../commands/built-in/0x01-ty-data-response/payload/codec/encode-tuya-zigbee-ty-data-response-payload.ts';
import { encodeTuyaZigbeeTyDataReportPayload } from '../../../commands/built-in/0x02-ty-data-report/payload/codec/encode-tuya-zigbee-ty-data-report-payload.ts';
import { TuyaZigbeeSequenceGenerator } from '../../../sequence/generator/tuya-zigbee-sequence-generator.ts';
import { TuyaZigbeeDataPointProperty } from './tuya-zigbee-data-point-property.ts';

describe('TuyaZigbeeDataPointProperty', (): void => {
  test('write sends a stamped request and resolves with the ack.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const property = new TuyaZigbeeDataPointProperty<boolean>(stream, 7, 0x01, {
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

  test('read sends the query and resolves with the reported value.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const property = new TuyaZigbeeDataPointProperty<boolean>(stream, 7, 0x01);

    const promise = property.read.call(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x02,
      payload: Encoder.encode(
        { seq: 0x0001, dataPoints: [{ id: 7, type: 0x01, value: true }] },
        encodeTuyaZigbeeTyDataReportPayload,
      ),
    });

    expect(await promise).toBe(true);
    expect(sent).toHaveLength(1);
    expect(sent[0].command).toBe(0x03);
  });

  test('observe emits the reported values.', async (): Promise<void> => {
    const { stream, emit } = createFakeCommandStream();
    const property = new TuyaZigbeeDataPointProperty<boolean>(stream, 7, 0x01);

    const promise = property.observe.first(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x02,
      payload: Encoder.encode(
        { seq: 0x0001, dataPoints: [{ id: 7, type: 0x01, value: true }] },
        encodeTuyaZigbeeTyDataReportPayload,
      ),
    });

    expect(await promise).toBe(true);
  });
});
