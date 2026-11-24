import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../test/fake-command-stream/fake-command-stream.ts';
import { TuyaZigbeeTyDataRequestCommand } from '../built-in/0x00-ty-data-request/tuya-zigbee-ty-data-request-command.ts';

describe('TuyaZigbeeCommand', (): void => {
  test('send builds a cluster 0xef00 frame from the payload mapper.', async (): Promise<void> => {
    const { stream, sent } = createFakeCommandStream();
    const command = new TuyaZigbeeTyDataRequestCommand(stream);

    await command.send.call(new AbortController().signal, {
      seq: 0x1234,
      dataPoints: [{ id: 1, type: 0x01, value: true }],
    });

    expect(sent).toEqual([
      {
        cluster: 0xef00,
        clusterSpecific: true,
        direction: 'client-to-server',
        command: 0x00,
        payload: new Uint8Array([0x12, 0x34, 0x01, 0x01, 0x00, 0x01, 0x01]),
      },
    ]);
  });

  test('observe maps matching frames into the command arguments.', async (): Promise<void> => {
    const { stream, emit } = createFakeCommandStream();
    const command = new TuyaZigbeeTyDataRequestCommand(stream);

    const promise = command.observe.first(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'client-to-server',
      command: 0x00,
      payload: new Uint8Array([0x12, 0x34, 0x01, 0x01, 0x00, 0x01, 0x01]),
    });

    expect(await promise).toEqual([
      { seq: 0x1234, dataPoints: [{ id: 1, type: 0x01, value: true }] },
    ]);
  });

  test('observe drops frames not matching the static fields.', async (): Promise<void> => {
    const { stream, emit } = createFakeCommandStream();
    const command = new TuyaZigbeeTyDataRequestCommand(stream);

    const promise = command.observe.first(new AbortController().signal);
    emit({
      cluster: 0x1234,
      clusterSpecific: true,
      direction: 'client-to-server',
      command: 0x00,
      payload: new Uint8Array([0xaa]),
    });
    emit({
      cluster: 0xef00,
      clusterSpecific: false,
      direction: 'client-to-server',
      command: 0x00,
      payload: new Uint8Array([0xaa]),
    });
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x00,
      payload: new Uint8Array([0xaa]),
    });
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'client-to-server',
      command: 0x02,
      payload: new Uint8Array([0xaa]),
    });
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'client-to-server',
      command: 0x00,
      payload: new Uint8Array([0x12, 0x34, 0x01, 0x01, 0x00, 0x01, 0x01]),
    });

    expect(await promise).toEqual([
      { seq: 0x1234, dataPoints: [{ id: 1, type: 0x01, value: true }] },
    ]);
  });
});
