import type { HavingObserveAbility, HavingSendAbility } from '@thingmate/abilities';
import { AsyncFunction } from '@xstd/async-function';

import type { TuyaZigbeeTyDataRequestCommandArguments } from '../../../commands/built-in/0x00-ty-data-request/arguments/tuya-zigbee-ty-data-request-command-arguments.ts';
import type { TuyaZigbeeTyDataRequestPayload } from '../../../commands/built-in/0x00-ty-data-request/payload/tuya-zigbee-ty-data-request-payload.ts';
import type { TuyaZigbeeTyDataResponseCommandArguments } from '../../../commands/built-in/0x01-ty-data-response/arguments/tuya-zigbee-ty-data-response-command-arguments.ts';
import type { TuyaZigbeeTyDataResponsePayload } from '../../../commands/built-in/0x01-ty-data-response/payload/tuya-zigbee-ty-data-response-payload.ts';
import type { TuyaZigbeeDataPoint } from '../../data-point/tuya-zigbee-data-point.ts';

export interface ZCLWriteAttributeActionRawOptions {
  readonly tyDataRequest: HavingSendAbility<TuyaZigbeeTyDataRequestCommandArguments>;
  readonly tyDataResponse: HavingObserveAbility<TuyaZigbeeTyDataResponseCommandArguments>;
  readonly checkDataPointIds?: boolean;
}

export type TuyaZigbeeWriteDataPointsActionRawArguments = TuyaZigbeeTyDataRequestCommandArguments;

export class TuyaZigbeeWriteDataPointsActionRaw extends AsyncFunction<
  TuyaZigbeeWriteDataPointsActionRawArguments,
  TuyaZigbeeTyDataResponsePayload
> {
  constructor({
    tyDataRequest,
    tyDataResponse,
    checkDataPointIds = false,
  }: ZCLWriteAttributeActionRawOptions) {
    super(
      AsyncFunction.fromSendAndReceive<
        TuyaZigbeeWriteDataPointsActionRawArguments,
        TuyaZigbeeTyDataResponsePayload
      >({
        send: tyDataRequest.send,
        receive: new AsyncFunction<
          TuyaZigbeeWriteDataPointsActionRawArguments,
          TuyaZigbeeTyDataResponsePayload
        >(
          (
            signal: AbortSignal,
            requestPayload: TuyaZigbeeTyDataRequestPayload,
          ): Promise<TuyaZigbeeTyDataResponsePayload> => {
            return tyDataResponse.observe
              .filter(([responsePayload]: TuyaZigbeeTyDataResponseCommandArguments): boolean => {
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
              .map(
                ([
                  responsePayload,
                ]: TuyaZigbeeTyDataResponseCommandArguments): TuyaZigbeeTyDataResponsePayload =>
                  responsePayload,
              )
              .first(signal);
          },
        ),
      }),
    );
  }
}
