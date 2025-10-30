import { NONE, type None } from '@xstd/none';
import { type TuyaZigbeeTyDataReportPayload } from '../../../../../../../commands/0x02--ty-data-report/types/tuya-zigbee-ty-data-report-payload/tuya-zigbee-ty-data-report-payload.js';
import { type TuyaZigbeeDataPointsObserver } from '../../../../../../entities/events/data-points-observer/tuya-zigbee-data-points-observer.js';
import { type TuyaZigbeeDataPointObserver } from '../../tuya-zigbee-data-point-observer.js';

export interface CreateTuyaZigbeeDataPointObserverUsingTuyaZigbeeDataPointsObserverOptions {
  readonly observer: TuyaZigbeeDataPointsObserver;
  readonly dataPointId: number /* u8 */;
}

export function createTuyaZigbeeDataPointObserverUsingTuyaZigbeeDataPointsObserver<GValue>({
  observer,
  dataPointId,
}: CreateTuyaZigbeeDataPointObserverUsingTuyaZigbeeDataPointsObserverOptions): TuyaZigbeeDataPointObserver<GValue> {
  return observer.mapFilter((payload: TuyaZigbeeTyDataReportPayload): GValue | None => {
    for (const dataPoint of payload.dataPoints) {
      if (dataPoint.id === dataPointId) {
        return dataPoint.value as GValue;
      }
    }
    return NONE;
  });
}
