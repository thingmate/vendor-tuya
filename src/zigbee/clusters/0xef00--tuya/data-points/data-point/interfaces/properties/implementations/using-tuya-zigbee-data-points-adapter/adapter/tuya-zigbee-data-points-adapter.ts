import { type QueryTuyaZigbeeDataPointsAction } from '../../../../../../interfaces/actions/query-data-points/query-tuya-zigbee-data-points.action.js';
import { type WriteTuyaZigbeeDataPointsAction } from '../../../../../../interfaces/actions/write-data-points/write-tuya-zigbee-data-points.action.js';
import { type ObserveTuyaZigbeeDataPointsFlow } from '../../../../../../interfaces/flows/observe-data-points/observe-tuya-zigbee-data-points.flow.js';

export interface TuyaZigbeeDataPointsAdapter {
  readonly query: QueryTuyaZigbeeDataPointsAction;
  readonly write: WriteTuyaZigbeeDataPointsAction;
  readonly observe: ObserveTuyaZigbeeDataPointsFlow;
}
