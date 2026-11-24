import { AsyncFunction } from '@xstd/async-function';
import { cachedInstance } from '@xstd/deep-map';
import type { TuyaZigbeeTyDataRequestPayload } from '../../../../commands/built-in/0x00-ty-data-request/payload/tuya-zigbee-ty-data-request-payload.ts';
import type { TuyaZigbeeCommandStream } from '../../../../commands/command/tuya-zigbee-command.ts';
import type { HavingTuyaZigbeeSequenceGeneratorAbilities } from '../../../../sequence/generator/having-tuya-zigbee-sequence-generator-abilities.ts';
import { TuyaZigbeeSequenceGenerator } from '../../../../sequence/generator/tuya-zigbee-sequence-generator.ts';
import { TuyaZigbeeWriteDataPointsAction } from '../../../actions/write-data-points/tuya-zigbee-write-data-points-action.ts';
import type { TuyaZigbeeDataPointType } from '../../data-types/tuya-zigbee-data-point-type.ts';

/**
 * Options of the single data point write action.
 */
export interface TuyaZigbeeWriteDataPointActionOptions {
  /**
   * Sequence number generator used to stamp the `TY_DATA_REQUEST` payloads.
   * Defaults to the process-wide shared generator.
   */
  readonly seq?: HavingTuyaZigbeeSequenceGeneratorAbilities | undefined;
}

/**
 * Arguments of a single data point write action: the value to write.
 */
export type TuyaZigbeeWriteDataPointActionArguments<GValue> = readonly [value: GValue];

/**
 * Writes a single data point and awaits the device acknowledgement.
 *
 * Builds a one-data-point `TY_DATA_REQUEST` payload stamped by the sequence
 * number generator, and resolves once the matching `TY_DATA_RESPONSE` arrives.
 */
export class TuyaZigbeeWriteDataPointAction<GValue> extends AsyncFunction<
  TuyaZigbeeWriteDataPointActionArguments<GValue>,
  void
> {
  constructor(
    stream: TuyaZigbeeCommandStream,
    dataPointId: number,
    dataPointType: TuyaZigbeeDataPointType,
    { seq = TuyaZigbeeSequenceGenerator.shared }: TuyaZigbeeWriteDataPointActionOptions = {},
  ) {
    super(
      cachedInstance(TuyaZigbeeWriteDataPointsAction, stream)
        .mapArguments((value: GValue): [payload: TuyaZigbeeTyDataRequestPayload] => {
          return [
            {
              seq: seq.next(),
              dataPoints: [
                {
                  id: dataPointId,
                  type: dataPointType,
                  value,
                },
              ],
            } satisfies TuyaZigbeeTyDataRequestPayload,
          ];
        })
        .then((): void => {}),
    );
  }
}
