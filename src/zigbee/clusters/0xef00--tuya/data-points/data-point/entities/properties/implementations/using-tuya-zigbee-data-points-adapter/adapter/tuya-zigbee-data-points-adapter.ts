import { type QueryTuyaZigbeeDataPoints } from '../../../../../../entities/actions/query-data-points/query-tuya-zigbee-data-points.js';
import { type WriteTuyaZigbeeDataPoints } from '../../../../../../entities/actions/write-data-points/write-tuya-zigbee-data-points.js';
import { type TuyaZigbeeDataPointsObserver } from '../../../../../../entities/events/data-points-observer/tuya-zigbee-data-points-observer.js';

export interface TuyaZigbeeDataPointsAdapter {
  readonly query: QueryTuyaZigbeeDataPoints;
  readonly write: WriteTuyaZigbeeDataPoints;
  readonly observer: TuyaZigbeeDataPointsObserver;
}
