import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../test/fake-command-stream/fake-command-stream.ts';
import { TuyaZigbeeQueryDataPointsAction } from './tuya-zigbee-query-data-points-action.ts';

describe('TuyaZigbeeQueryDataPointsAction', (): void => {
  test('sends the ty-data-query command.', async (): Promise<void> => {
    const { stream, sent } = createFakeCommandStream();
    const action = new TuyaZigbeeQueryDataPointsAction(stream);

    await action.call(new AbortController().signal);

    expect(sent).toEqual([
      {
        cluster: 0xef00,
        clusterSpecific: true,
        direction: 'client-to-server',
        command: 0x03,
        payload: new Uint8Array(0),
      },
    ]);
  });
});
