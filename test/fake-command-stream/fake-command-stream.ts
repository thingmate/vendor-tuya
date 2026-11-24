import { type HavingCommandAbilities } from '@thingmate/abilities';
import {
  type PrefilteredZCLClusterCommandCommandFrame,
  type PrefilteredZCLClusterCommandStreamArguments,
} from '@thingmate/zigbee';
import { AsyncFunction } from '@xstd/async-function';
import { createFakeObserveAbility } from '../fake-observe-ability/fake-observe-ability.ts';

export interface FakeCommandStream {
  readonly stream: HavingCommandAbilities<PrefilteredZCLClusterCommandStreamArguments>;
  /** The command frames built by every send, in send order. */
  readonly sent: readonly PrefilteredZCLClusterCommandCommandFrame[];
  /** Emits an incoming command frame (buffered until the observation is established). */
  readonly emit: (frame: PrefilteredZCLClusterCommandCommandFrame) => void;
}

/**
 * Creates a fake ZCL command stream: `sent` records the frames built by the commands'
 * sends, and `emit` injects incoming frames into the observation (buffered until
 * established, then flushed on a 0 ms timer — see the observe fake).
 */
export function createFakeCommandStream(): FakeCommandStream {
  const incoming = createFakeObserveAbility<PrefilteredZCLClusterCommandStreamArguments>();
  const sent: PrefilteredZCLClusterCommandCommandFrame[] = [];

  return {
    stream: {
      send: new AsyncFunction(
        (_signal: AbortSignal, ...args: PrefilteredZCLClusterCommandStreamArguments): void => {
          sent.push(...args);
        },
      ),
      observe: incoming.ability.observe,
    },
    sent,
    emit: (frame: PrefilteredZCLClusterCommandCommandFrame): void => {
      incoming.emit([frame]);
    },
  };
}
