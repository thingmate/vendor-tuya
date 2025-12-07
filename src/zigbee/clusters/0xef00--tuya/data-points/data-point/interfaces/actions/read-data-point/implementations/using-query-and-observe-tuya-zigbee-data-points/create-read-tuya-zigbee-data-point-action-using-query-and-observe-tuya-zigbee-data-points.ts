import { Action } from '@xstd/action';
import { type QueryTuyaZigbeeDataPointsAction } from '../../../../../../interfaces/actions/query-data-points/query-tuya-zigbee-data-points.action.js';
import { type ObserveTuyaZigbeeDataPointFlow } from '../../../../flows/observe-data-point/observe-tuya-zigbee-data-point.flow.js';
import { type ReadTuyaZigbeeDataPointAction } from '../../read-tuya-zigbee-data-point.action.js';

export interface CreateReadTuyaZigbeeDataPointActionUsingQueryAndObserveTuyaZigbeeDataPointsOptions<
  GValue,
> {
  readonly query: QueryTuyaZigbeeDataPointsAction;
  readonly observe: ObserveTuyaZigbeeDataPointFlow<GValue>;
}

export function createReadTuyaZigbeeDataPointActionUsingQueryAndObserveTuyaZigbeeDataPoints<
  GValue,
>({
  query,
  observe,
}: CreateReadTuyaZigbeeDataPointActionUsingQueryAndObserveTuyaZigbeeDataPointsOptions<GValue>): ReadTuyaZigbeeDataPointAction<GValue> {
  return Action.fromSendAndObserve<[], GValue>({
    send: query,
    observe: new Action((signal: AbortSignal): Promise<GValue> => {
      return observe.first(signal);
    }),
  });
}
