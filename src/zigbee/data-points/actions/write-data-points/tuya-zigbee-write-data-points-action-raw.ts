import type { HavingObserveAbility, HavingSendAbility } from '@thingmate/abilities';
import { AsyncFunction } from '@xstd/async-function';

import type { TuyaZigbeeTyDataRequestCommandArguments } from '../../../commands/built-in/0x00-ty-data-request/arguments/tuya-zigbee-ty-data-request-command-arguments.ts';
import type { TuyaZigbeeTyDataRequestPayload } from '../../../commands/built-in/0x00-ty-data-request/payload/tuya-zigbee-ty-data-request-payload.ts';
import type { TuyaZigbeeTyDataResponseCommandArguments } from '../../../commands/built-in/0x01-ty-data-response/arguments/tuya-zigbee-ty-data-response-command-arguments.ts';
import type { TuyaZigbeeTyDataResponsePayload } from '../../../commands/built-in/0x01-ty-data-response/payload/tuya-zigbee-ty-data-response-payload.ts';
import type { TuyaZigbeeDataPoint } from '../../data-point/tuya-zigbee-data-point.ts';

/**
 * Options of the raw write action, with injected command abilities.
 */
export interface TuyaZigbeeWriteDataPointsActionRawOptions {
  /** Ability sending the `TY_DATA_REQUEST` command. */
  readonly tyDataRequest: HavingSendAbility<TuyaZigbeeTyDataRequestCommandArguments>;
  /** Ability observing the `TY_DATA_RESPONSE` command. */
  readonly tyDataResponse: HavingObserveAbility<TuyaZigbeeTyDataResponseCommandArguments>;
  /**
   * When `true`, a response only matches if it contains every requested data point id.
   * Defaults to `false`: any response with the matching sequence number is accepted.
   */
  readonly checkDataPointIds?: boolean;
}

/**
 * Arguments of a data points write action: a single `TY_DATA_REQUEST` payload.
 */
export type TuyaZigbeeWriteDataPointsActionRawArguments = TuyaZigbeeTyDataRequestCommandArguments;

/**
 * Writes data points to a device and awaits its `TY_DATA_RESPONSE` acknowledgement.
 *
 * The response is correlated to the request by its sequence number, and optionally
 * by the presence of every requested data point id (see `checkDataPointIds`).
 */
export class TuyaZigbeeWriteDataPointsActionRaw extends AsyncFunction<
  TuyaZigbeeWriteDataPointsActionRawArguments,
  TuyaZigbeeTyDataResponsePayload
> {
  constructor({
    tyDataRequest,
    tyDataResponse,
    checkDataPointIds = false,
  }: TuyaZigbeeWriteDataPointsActionRawOptions) {
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
