import { type Abortable, abortableContext } from '@xstd/abortable';
import { type QueryTuyaZigbeeDataPoints } from '../../../../../../entities/actions/query-data-points/query-tuya-zigbee-data-points.js';
import { type TuyaZigbeeDataPointObserver } from '../../../../events/data-point-observer/tuya-zigbee-data-point-observer.js';
import { type ReadTuyaZigbeeDataPoint } from '../../read-tuya-zigbee-data-point.js';

export interface CreateReadTuyaZigbeeDataPointUsingQueryTuyaZigbeeDataPointsAndObserverOptions<
  GValue,
> {
  readonly query: QueryTuyaZigbeeDataPoints;
  readonly observer: TuyaZigbeeDataPointObserver<GValue>;
}

export function createReadTuyaZigbeeDataPointUsingQueryTuyaZigbeeDataPointsAndObserver<GValue>({
  query,
  observer,
}: CreateReadTuyaZigbeeDataPointUsingQueryTuyaZigbeeDataPointsAndObserverOptions<GValue>): ReadTuyaZigbeeDataPoint<GValue> {
  return async (options?: Abortable): Promise<GValue> => {
    return abortableContext(async (signal: AbortSignal): Promise<GValue> => {
      return (await Promise.all([observer.first(signal), query({ signal })]))[0];
    }, options);
  };
}
