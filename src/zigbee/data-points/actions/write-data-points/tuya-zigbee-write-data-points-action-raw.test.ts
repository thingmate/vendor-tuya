import { describe, expect, test } from 'vitest';
import { createFakeObserveAbility } from '../../../../../test/fake-observe-ability/fake-observe-ability.ts';
import { createFakeSendAbility } from '../../../../../test/fake-send-ability/fake-send-ability.ts';
import { type TuyaZigbeeTyDataRequestCommandArguments } from '../../../commands/built-in/0x00-ty-data-request/arguments/tuya-zigbee-ty-data-request-command-arguments.ts';
import { type TuyaZigbeeTyDataResponseCommandArguments } from '../../../commands/built-in/0x01-ty-data-response/arguments/tuya-zigbee-ty-data-response-command-arguments.ts';
import { TuyaZigbeeWriteDataPointsActionRaw } from './tuya-zigbee-write-data-points-action-raw.ts';

describe('TuyaZigbeeWriteDataPointsActionRaw', (): void => {
  test('sends the request and resolves with the response matching the sequence number.', async (): Promise<void> => {
    const request = createFakeSendAbility<TuyaZigbeeTyDataRequestCommandArguments>();
    const response = createFakeObserveAbility<TuyaZigbeeTyDataResponseCommandArguments>();
    const action = new TuyaZigbeeWriteDataPointsActionRaw({
      tyDataRequest: request.ability,
      tyDataResponse: response.ability,
    });

    const requestPayload = {
      seq: 0x1234,
      dataPoints: [{ id: 1, type: 0x01, value: true }],
    } as const;
    // a different data point id: the default correlation only checks the sequence number
    const responsePayload = {
      seq: 0x1234,
      dataPoints: [{ id: 9, type: 0x01, value: true }],
    } as const;

    const promise = action.call(new AbortController().signal, requestPayload);
    response.emit([responsePayload]);

    expect(await promise).toEqual(responsePayload);
    expect(request.sent).toEqual([[requestPayload]]);
  });

  test('ignores responses with a different sequence number.', async (): Promise<void> => {
    const request = createFakeSendAbility<TuyaZigbeeTyDataRequestCommandArguments>();
    const response = createFakeObserveAbility<TuyaZigbeeTyDataResponseCommandArguments>();
    const action = new TuyaZigbeeWriteDataPointsActionRaw({
      tyDataRequest: request.ability,
      tyDataResponse: response.ability,
    });

    const requestPayload = {
      seq: 0x1234,
      dataPoints: [{ id: 1, type: 0x01, value: true }],
    } as const;

    const promise = action.call(new AbortController().signal, requestPayload);
    response.emit([
      {
        seq: 0x4321,
        dataPoints: [{ id: 1, type: 0x01, value: true }],
      },
    ]);
    response.emit([
      {
        seq: 0x1234,
        dataPoints: [{ id: 1, type: 0x01, value: true }],
      },
    ]);

    expect(await promise).toEqual({
      seq: 0x1234,
      dataPoints: [{ id: 1, type: 0x01, value: true }],
    });
    expect(request.sent).toEqual([[requestPayload]]);
  });

  test('with checkDataPointIds, ignores a response missing a requested data point id.', async (): Promise<void> => {
    const request = createFakeSendAbility<TuyaZigbeeTyDataRequestCommandArguments>();
    const response = createFakeObserveAbility<TuyaZigbeeTyDataResponseCommandArguments>();
    const action = new TuyaZigbeeWriteDataPointsActionRaw({
      tyDataRequest: request.ability,
      tyDataResponse: response.ability,
      checkDataPointIds: true,
    });

    const requestPayload = {
      seq: 0x1234,
      dataPoints: [
        { id: 1, type: 0x01, value: true },
        { id: 2, type: 0x01, value: false },
      ],
    } as const;

    const promise = action.call(new AbortController().signal, requestPayload);
    response.emit([
      {
        seq: 0x1234,
        dataPoints: [{ id: 1, type: 0x01, value: true }], // missing id 2: ignored
      },
    ]);
    response.emit([
      {
        seq: 0x1234,
        dataPoints: [
          { id: 1, type: 0x01, value: true },
          { id: 2, type: 0x01, value: false },
        ],
      },
    ]);

    expect(await promise).toEqual({
      seq: 0x1234,
      dataPoints: [
        { id: 1, type: 0x01, value: true },
        { id: 2, type: 0x01, value: false },
      ],
    });
    expect(request.sent).toEqual([[requestPayload]]);
  });
});
