import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../test/fake-command-stream/fake-command-stream.ts';
import { TuyaZigbeeTyDataQueryCommand } from './tuya-zigbee-ty-data-query-command.ts';

describe('TuyaZigbeeTyDataQueryCommand', (): void => {
  test('binds ty-data-query (0x03, client-to-server) on the private cluster with an empty payload.', async (): Promise<void> => {
    const { stream, sent, emit } = createFakeCommandStream();
    const command = new TuyaZigbeeTyDataQueryCommand(stream);

    await command.send.call(new AbortController().signal);

    expect(sent[0].cluster).toBe(0xef00);
    expect(sent[0].clusterSpecific).toBe(true);
    expect(sent[0].direction).toBe('client-to-server');
    expect(sent[0].command).toBe(0x03);
    expect(sent[0].payload).toEqual(new Uint8Array(0));

    const promise = command.observe.first(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'client-to-server',
      command: 0x03,
      payload: new Uint8Array(0),
    });
    expect(await promise).toEqual([]);
  });
});
