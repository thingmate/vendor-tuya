import { cachedInstance } from '@xstd/deep-map';
import { TuyaZigbeeTyDataReportCommand } from '../../../../commands/built-in/0x02-ty-data-report/tuya-zigbee-ty-data-report-command.ts';
import type { TuyaZigbeeCommandStream } from '../../../../commands/command/tuya-zigbee-command.ts';
import { TuyaZigbeeDataPointObserverRaw } from './tuya-zigbee-data-point-observer-raw.ts';

/**
 * Observes the reported value of a single data point over a command stream.
 */
export class TuyaZigbeeDataPointObserver<GValue> extends TuyaZigbeeDataPointObserverRaw<GValue> {
  constructor(stream: TuyaZigbeeCommandStream, dataPointId: number) {
    super({
      tyDataReport: cachedInstance(TuyaZigbeeTyDataReportCommand, stream),
      dataPointId,
    });
  }
}
