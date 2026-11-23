import type { HavingObserveAbility, HavingSendAbility } from '@thingmate/abilities';
import type { VoidArguments } from '@thingmate/zigbee';
import { AsyncFunction } from '@xstd/async-function';

export interface TuyaZigbeeReadDataPointActionRawOptions<GValue> {
  readonly observer: HavingObserveAbility<GValue>;
  readonly tyDataQuery: HavingSendAbility<VoidArguments>;
}

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
