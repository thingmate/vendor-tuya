import type { HavingObserveAbility, HavingSendAbility } from '@thingmate/abilities';
import type { VoidArguments } from '@thingmate/zigbee';
import { AsyncFunction } from '@xstd/async-function';

/**
 * Options of the raw read action, with injected abilities.
 */
export interface TuyaZigbeeReadDataPointActionRawOptions<GValue> {
  /** Ability observing the reported data point values. */
  readonly observer: HavingObserveAbility<GValue>;
  /** Ability sending the `TY_DATA_QUERY` command. */
  readonly tyDataQuery: HavingSendAbility<VoidArguments>;
}

/**
 * Queries a device for its current data points and resolves with the observed
 * value of a single data point.
 */
export class TuyaZigbeeReadDataPointActionRaw<GValue> extends AsyncFunction<VoidArguments, GValue> {
  constructor({ observer, tyDataQuery }: TuyaZigbeeReadDataPointActionRawOptions<GValue>) {
    super(
      AsyncFunction.fromSendAndReceive<VoidArguments, GValue>({
        send: tyDataQuery.send,
        receive: new AsyncFunction((signal: AbortSignal): Promise<GValue> => {
          return observer.observe.first(signal);
        }),
      }),
    );
  }
}
