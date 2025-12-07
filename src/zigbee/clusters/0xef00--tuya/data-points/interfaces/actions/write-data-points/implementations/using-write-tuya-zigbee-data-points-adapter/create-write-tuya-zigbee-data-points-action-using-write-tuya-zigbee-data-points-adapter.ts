import { Action } from '@xstd/action';
import { type TuyaZigbeeTyDataRequestPayload } from '../../../../../../commands/0x00--ty-data-request/members/tuya-zigbee-ty-data-request-payload/tuya-zigbee-ty-data-request-payload.js';
import { type TuyaZigbeeTyDataResponsePayload } from '../../../../../../commands/0x01--ty-data-response/members/tuya-zigbee-ty-data-response-payload/tuya-zigbee-ty-data-response-payload.js';
import { type TuyaZigbeeDataPoint } from '../../../../../data-point/tuya-zigbee-data-point.js';
import { type WriteTuyaZigbeeDataPointsAction } from '../../write-tuya-zigbee-data-points.action.js';
import { type WriteTuyaZigbeeDataPointsAdapter } from './adapter/write-tuya-zigbee-data-points-adapter.js';

export interface CreateWriteTuyaZigbeeDataPointsActionUsingWriteTuyaZigbeeDataPointsAdapterOptions extends WriteTuyaZigbeeDataPointsAdapter {
  readonly checkDataPointIds?: boolean;
}

export function createWriteTuyaZigbeeDataPointsActionUsingWriteTuyaZigbeeDataPointsAdapter({
  send,
  observe,
  checkDataPointIds = false,
}: CreateWriteTuyaZigbeeDataPointsActionUsingWriteTuyaZigbeeDataPointsAdapterOptions): WriteTuyaZigbeeDataPointsAction {
  return Action.fromSendAndObserve<
    [payload: TuyaZigbeeTyDataRequestPayload],
    TuyaZigbeeTyDataResponsePayload
  >({
    send,
    observe: new Action<[payload: TuyaZigbeeTyDataRequestPayload], TuyaZigbeeTyDataResponsePayload>(
      async (
        signal: AbortSignal,
        requestPayload: TuyaZigbeeTyDataRequestPayload,
      ): Promise<TuyaZigbeeTyDataResponsePayload> => {
        return observe
          .filter((responsePayload: TuyaZigbeeTyDataResponsePayload): boolean => {
            return (
              responsePayload.seq === requestPayload.seq &&
              (!checkDataPointIds ||
                requestPayload.dataPoints.every(
                  ({ id: requestDataPointId }: TuyaZigbeeDataPoint): boolean => {
                    return responsePayload.dataPoints.some(
                      ({ id: responseDataPointId }: TuyaZigbeeDataPoint): boolean => {
                        // TODO compare values ?
                        return requestDataPointId === responseDataPointId;
                      },
                    );
                  },
                ))
            );
          })
          .first(signal);
      },
    ),
  });
}
