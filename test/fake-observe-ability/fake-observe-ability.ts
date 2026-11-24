import { type HavingObserveAbility } from '@thingmate/abilities';
import { ListenerResource, type EmitValue } from '@xstd/listener-resource';
import { ObservableAsyncFunction } from '@xstd/observable-async-function';

export interface FakeObserveAbility<GValue> {
  readonly ability: HavingObserveAbility<GValue>;
  readonly emit: (value: GValue) => void;
}

/**
 * Creates an observe ability emitting only the values the test pushes with `emit`.
 *
 * Values emitted before the observation is established are buffered, then flushed
 * on a 0 ms timer after the establishment (by then the downstream listeners are
 * registered). Values emitted after the establishment are forwarded to the live
 * resource directly: deliver them while a pull is pending (right after starting
 * `first()` or `next()`), as the consumer-side `EdgeQueuingPolicy` (the default)
 * drops values emitted while it is not pulling.
 * Designed for a single established observation per instance.
 */
export function createFakeObserveAbility<GValue>(): FakeObserveAbility<GValue> {
  const buffered: GValue[] = [];
  let established: { readonly emit: EmitValue<GValue>; ready: boolean } | undefined;

  const observe: ObservableAsyncFunction<GValue> = new ObservableAsyncFunction<GValue>(
    (_signal: AbortSignal): ListenerResource<GValue> => {
      return new ListenerResource<GValue>((emit: EmitValue<GValue>): void => {
        const state: { readonly emit: EmitValue<GValue>; ready: boolean } = { emit, ready: false };
        established = state;
        setTimeout((): void => {
          state.ready = true;
          for (const value of buffered.splice(0)) {
            emit(value);
          }
        }, 0);
      });
    },
  );

  return {
    ability: { observe },
    emit: (value: GValue): void => {
      const target: { readonly emit: EmitValue<GValue>; ready: boolean } | undefined = established;
      if (target === undefined || !target.ready) {
        buffered.push(value);
      } else {
        target.emit(value);
      }
    },
  };
}
