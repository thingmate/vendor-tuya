import { Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../test/fake-command-stream/fake-command-stream.ts';
import { encodeTuyaZigbeeTyDataReportPayload } from './payload/codec/encode-tuya-zigbee-ty-data-report-payload.ts';
import { TuyaZigbeeTyDataReportCommand } from './tuya-zigbee-ty-data-report-command.ts';

describe('TuyaZigbeeTyDataReportCommand', (): void => {
  test('binds ty-data-report (0x02, server-to-client) on the private cluster.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const command = new TuyaZigbeeTyDataReportCommand(stream);
    const payload = {
      seq: 0xabcd,
      dataPoints: [{ id: 1, type: 0x01, value: true }],
    } as const;

    await command.send.call(new AbortController().signal, payload);

    expect(sent[0].cluster).toBe(0xef00);
    expect(sent[0].clusterSpecific).toBe(true);
    expect(sent[0].direction).toBe('server-to-client');
    expect(sent[0].command).toBe(0x02);

    const promise = command.observe.first(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x02,
      payload: Encoder.encode(payload, encodeTuyaZigbeeTyDataReportPayload),
    });
    expect(await promise).toEqual([payload]);
  });
});
