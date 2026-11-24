import { Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../../test/fake-command-stream/fake-command-stream.ts';
import { encodeTuyaZigbeeTyDataReportPayload } from '../../../../commands/built-in/0x02-ty-data-report/payload/codec/encode-tuya-zigbee-ty-data-report-payload.ts';
import { TuyaZigbeeReadDataPointAction } from './tuya-zigbee-read-data-point-action.ts';

describe('TuyaZigbeeReadDataPointAction', (): void => {
  test('sends the query and resolves with the reported value.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const action = new TuyaZigbeeReadDataPointAction<number>(stream, 2);

    const promise = action.call(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x02,
      payload: Encoder.encode(
        { seq: 0x0001, dataPoints: [{ id: 2, type: 0x02, value: 0x2a }] },
        encodeTuyaZigbeeTyDataReportPayload,
      ),
    });

    expect(await promise).toBe(0x2a);
    expect(sent).toHaveLength(1);
    expect(sent[0].command).toBe(0x03);
  });
});
