import { NONE, type None } from '@xstd/none';
import { type TuyaZigbeeTyDataReportPayload } from '../../../../../../../commands/0x02--ty-data-report/members/tuya-zigbee-ty-data-report-payload/tuya-zigbee-ty-data-report-payload.js';
import { type ObserveTuyaZigbeeDataPointsFlow } from '../../../../../../interfaces/flows/observe-data-points/observe-tuya-zigbee-data-points.flow.js';
import { type ObserveTuyaZigbeeDataPointFlow } from '../../observe-tuya-zigbee-data-point.flow.js';

export interface CreateObserveTuyaZigbeeDataPointFlowUsingObserveTuyaZigbeeDataPointsFlowOptions {
  readonly observe: ObserveTuyaZigbeeDataPointsFlow;
  readonly dataPointId: number /* u8 */;
}

export function createObserveTuyaZigbeeDataPointFlowUsingObserveTuyaZigbeeDataPointsFlow<GValue>({
  observe,
  dataPointId,
}: CreateObserveTuyaZigbeeDataPointFlowUsingObserveTuyaZigbeeDataPointsFlowOptions): ObserveTuyaZigbeeDataPointFlow<GValue> {
  return observe.mapFilter((payload: TuyaZigbeeTyDataReportPayload): GValue | None => {
    for (const dataPoint of payload.dataPoints) {
      if (dataPoint.id === dataPointId) {
        return dataPoint.value as GValue;
      }
    }
    return NONE;
  });
}
