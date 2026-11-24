import { Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../test/fake-command-stream/fake-command-stream.ts';
import { encodeTuyaZigbeeTyDataRequestPayload } from './payload/codec/encode-tuya-zigbee-ty-data-request-payload.ts';
import { TuyaZigbeeTyDataRequestCommand } from './tuya-zigbee-ty-data-request-command.ts';

describe('TuyaZigbeeTyDataRequestCommand', (): void => {
  test('binds ty-data-request (0x00, client-to-server) on the private cluster.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const command = new TuyaZigbeeTyDataRequestCommand(stream);
    const payload = { seq: 0xabcd, dataPoints: [] } as const;

    await command.send.call(new AbortController().signal, payload);

    expect(sent[0].cluster).toBe(0xef00);
    expect(sent[0].clusterSpecific).toBe(true);
    expect(sent[0].direction).toBe('client-to-server');
    expect(sent[0].command).toBe(0x00);
    expect(sent[0].payload).toEqual(new Uint8Array([0xab, 0xcd]));

    const promise = command.observe.first(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'client-to-server',
      command: 0x00,
      payload: Encoder.encode(payload, encodeTuyaZigbeeTyDataRequestPayload),
    });
    expect(await promise).toEqual([payload]);
  });
});
