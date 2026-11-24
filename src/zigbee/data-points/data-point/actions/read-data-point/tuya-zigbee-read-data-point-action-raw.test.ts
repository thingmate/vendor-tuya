import { type VoidArguments } from '@thingmate/zigbee';
import { describe, expect, test } from 'vitest';
import { createFakeObserveAbility } from '../../../../../../test/fake-observe-ability/fake-observe-ability.ts';
import { createFakeSendAbility } from '../../../../../../test/fake-send-ability/fake-send-ability.ts';
import { TuyaZigbeeReadDataPointActionRaw } from './tuya-zigbee-read-data-point-action-raw.ts';

describe('TuyaZigbeeReadDataPointActionRaw', (): void => {
  test('sends the query and resolves with the observed value.', async (): Promise<void> => {
    const observer = createFakeObserveAbility<number>();
    const query = createFakeSendAbility<VoidArguments>();
    const action = new TuyaZigbeeReadDataPointActionRaw<number>({
      observer: observer.ability,
      tyDataQuery: query.ability,
    });

    const promise = action.call(new AbortController().signal);
    observer.emit(0x2a);

    expect(await promise).toBe(0x2a);
    expect(query.sent).toEqual([[]]); // exactly one query call, without arguments
  });

  test('resolves with the first observed value.', async (): Promise<void> => {
    const observer = createFakeObserveAbility<number>();
    const query = createFakeSendAbility<VoidArguments>();
    const action = new TuyaZigbeeReadDataPointActionRaw<number>({
      observer: observer.ability,
      tyDataQuery: query.ability,
    });

    const promise = action.call(new AbortController().signal);
    observer.emit(0x2a);
    observer.emit(0x2b);

    expect(await promise).toBe(0x2a);
  });
});
