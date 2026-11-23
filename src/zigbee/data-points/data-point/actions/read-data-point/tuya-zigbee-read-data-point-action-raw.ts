import type { HavingObserveAbility, HavingSendAbility } from '@thingmate/abilities';
import { AsyncFunction } from '@xstd/async-function';
import type { VoidArguments } from '../../../../../../../../zigbee/v5/src/misc/types/void-arguments.ts';

export interface ZCLReadAttributeActionRawOptions<GValue> {
  readonly observer: HavingObserveAbility<GValue>;
  readonly tyDataQuery: HavingSendAbility<VoidArguments>;
}

export class TuyaZigbeeReadDataPointActionRaw<GValue> extends AsyncFunction<VoidArguments, GValue> {
  constructor({ observer, tyDataQuery }: ZCLReadAttributeActionRawOptions<GValue>) {
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
