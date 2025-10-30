import { type Abortable, abortableContext } from '@xstd/abortable';
import { type TuyaZigbeeTyDataRequestPayload } from '../../../../../../commands/0x00--ty-data-request/types/tuya-zigbee-ty-data-request-payload/tuya-zigbee-ty-data-request-payload.js';
import { type TuyaZigbeeTyDataResponsePayload } from '../../../../../../commands/0x01--ty-data-response/types/tuya-zigbee-ty-data-response-payload/tuya-zigbee-ty-data-response-payload.js';
import { type TuyaZigbeeDataPoint } from '../../../../../data-point/tuya-zigbee-data-point.js';
import { type WriteTuyaZigbeeDataPoints } from '../../write-tuya-zigbee-data-points.js';
import { type WriteTuyaZigbeeDataPointsAdapter } from './adapter/write-tuya-zigbee-data-points-adapter.js';

export interface CreateWriteTuyaZigbeeDataPointsUsingWriteTuyaZigbeeDataPointsAdapterOptions
  extends WriteTuyaZigbeeDataPointsAdapter {
  readonly checkDataPointIds?: boolean;
}

export function createWriteTuyaZigbeeDataPointsUsingWriteTuyaZigbeeDataPointsAdapter({
  send,
  observer,
  checkDataPointIds = false,
}: CreateWriteTuyaZigbeeDataPointsUsingWriteTuyaZigbeeDataPointsAdapterOptions): WriteTuyaZigbeeDataPoints {
  return (
    requestPayload: TuyaZigbeeTyDataRequestPayload,
    options?: Abortable,
  ): Promise<TuyaZigbeeTyDataResponsePayload> => {
    return abortableContext(
      async (signal: AbortSignal): Promise<TuyaZigbeeTyDataResponsePayload> => {
        return (
          await Promise.all([
            observer
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
              .first(signal),
            send(requestPayload, { signal }),
          ])
        )[0];
      },
      options,
    );
  };
}
