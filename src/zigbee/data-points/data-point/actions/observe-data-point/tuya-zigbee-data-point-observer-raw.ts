import { type HavingObserveAbility, ObserveAbility } from '@thingmate/abilities';
import { NONE, type None } from '@xstd/none';
import type { TuyaZigbeeTyDataReportCommandArguments } from '../../../../commands/built-in/0x02-ty-data-report/arguments/tuya-zigbee-ty-data-report-command-arguments.ts';

export interface TuyaZigbeeDataPointObserverRawOptions {
  readonly tyDataReport: HavingObserveAbility<TuyaZigbeeTyDataReportCommandArguments>;
  readonly dataPointId: number; // u8
}

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
