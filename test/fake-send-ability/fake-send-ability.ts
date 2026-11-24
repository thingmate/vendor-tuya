import { type HavingSendAbility } from '@thingmate/abilities';
import { AsyncFunction } from '@xstd/async-function';

export interface FakeSendAbility<GArguments extends readonly unknown[]> {
  readonly ability: HavingSendAbility<GArguments>;
  /** The arguments of every send call, in call order. */
  readonly sent: readonly GArguments[];
}

/**
 * Creates a send ability recording the arguments of every call in `sent`.
 */
export function createFakeSendAbility<
  GArguments extends readonly unknown[],
>(): FakeSendAbility<GArguments> {
  const sent: GArguments[] = [];

  return {
    ability: {
      send: new AsyncFunction((_signal: AbortSignal, ...args: GArguments): void => {
        sent.push(args);
      }),
    },
    sent,
  };
}
