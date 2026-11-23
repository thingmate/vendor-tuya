import { AsyncFunction } from '@xstd/async-function';
import { cachedInstance } from '@xstd/deep-map';
import type { TuyaZigbeeTyDataRequestPayload } from '../../../../commands/built-in/0x00-ty-data-request/payload/tuya-zigbee-ty-data-request-payload.ts';
import type { TuyaZigbeeCommandStream } from '../../../../commands/command/tuya-zigbee-command.ts';
import type { HavingTuyaZigbeeSequenceGeneratorAbilities } from '../../../../sequence/generator/having-tuya-zigbee-sequence-generator-abilities.ts';
import { TuyaZigbeeSequenceGenerator } from '../../../../sequence/generator/tuya-zigbee-sequence-generator.ts';
import { TuyaZigbeeWriteDataPointsAction } from '../../../actions/write-data-points/tuya-zigbee-write-data-points-action.ts';
import type { TuyaZigbeeDataPointType } from '../../data-types/tuya-zigbee-data-point-type.ts';

export interface ZCLWriteAttributeActionOptions {
  readonly seq?: HavingTuyaZigbeeSequenceGeneratorAbilities | undefined;
}

export type TuyaZigbeeWriteDataPointActionArguments<GValue> = readonly [value: GValue];

export class TuyaZigbeeWriteDataPointAction<GValue> extends AsyncFunction<
  TuyaZigbeeWriteDataPointActionArguments<GValue>,
  void
> {
  constructor(
    stream: TuyaZigbeeCommandStream,
    dataPointId: number,
    dataPointType: TuyaZigbeeDataPointType,
    { seq = TuyaZigbeeSequenceGenerator.shared }: ZCLWriteAttributeActionOptions = {},
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
