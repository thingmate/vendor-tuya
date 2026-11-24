import { type HavingObserveAbility, ObserveAbility } from '@thingmate/abilities';
import { NONE, type None } from '@xstd/none';
import type { TuyaZigbeeTyDataReportCommandArguments } from '../../../../commands/built-in/0x02-ty-data-report/arguments/tuya-zigbee-ty-data-report-command-arguments.ts';

/**
 * Options of the raw data point observer, with the injected `TY_DATA_REPORT` ability.
 */
export interface TuyaZigbeeDataPointObserverRawOptions {
  /** Ability observing the `TY_DATA_REPORT` command. */
  readonly tyDataReport: HavingObserveAbility<TuyaZigbeeTyDataReportCommandArguments>;
  /** Id of the observed data point. */
  readonly dataPointId: number; // u8
}

/**
 * Emits the value of a single data point from every received `TY_DATA_REPORT`.
 *
 * Reports without the observed data point id are dropped.
 */
export class TuyaZigbeeDataPointObserverRaw<GValue> extends ObserveAbility<GValue> {
  constructor({ tyDataReport, dataPointId }: TuyaZigbeeDataPointObserverRawOptions) {
    super(
      tyDataReport.observe.mapFilter(
        ([payload]: TuyaZigbeeTyDataReportCommandArguments): GValue | None => {
          for (const dataPoint of payload.dataPoints) {
            if (dataPoint.id === dataPointId) {
              return dataPoint.value as GValue;
            }
          }
          return NONE;
        },
      ),
    );
  }
}
