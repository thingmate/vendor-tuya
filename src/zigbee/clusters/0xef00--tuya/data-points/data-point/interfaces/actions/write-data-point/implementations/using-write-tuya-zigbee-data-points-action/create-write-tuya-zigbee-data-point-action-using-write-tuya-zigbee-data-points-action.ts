import { type TuyaZigbeeTyDataRequestPayload } from '../../../../../../../commands/0x00--ty-data-request/members/tuya-zigbee-ty-data-request-payload/tuya-zigbee-ty-data-request-payload.js';
import { createTuyaZigbeeSequenceGenerator } from '../../../../../../../sequence/generator/implementations/create-tuya-zigbee-sequence-generator.js';
import { type TuyaZigbeeSequenceLike } from '../../../../../../../sequence/generator/implementations/tuya-zigbee-sequence-like.js';
import { type TuyaZigbeeSequenceGenerator } from '../../../../../../../sequence/generator/tuya-zigbee-sequence-generator.js';
import { type WriteTuyaZigbeeDataPointsAction } from '../../../../../../interfaces/actions/write-data-points/write-tuya-zigbee-data-points.action.js';
import { type TuyaZigbeeDataPointType } from '../../../../../data-types/tuya-zigbee-data-point-type.js';
import { type WriteTuyaZigbeeDataPointAction } from '../../write-tuya-zigbee-data-point.action.js';

export interface CreateWriteTuyaZigbeeDataPointActionUsingWriteTuyaZigbeeDataPointsActionOptions {
  readonly write: WriteTuyaZigbeeDataPointsAction;
  // dataPoint
  readonly dataPointId: number /* u8 */;
  readonly dataPointType: TuyaZigbeeDataPointType; // u8;
  readonly seq?: TuyaZigbeeSequenceLike | undefined;
}

export function createWriteTuyaZigbeeDataPointActionUsingWriteTuyaZigbeeDataPointsAction<GValue>({
  write,
  seq,
  dataPointId,
  dataPointType,
}: CreateWriteTuyaZigbeeDataPointActionUsingWriteTuyaZigbeeDataPointsActionOptions): WriteTuyaZigbeeDataPointAction<GValue> {
  const getSeq: TuyaZigbeeSequenceGenerator = createTuyaZigbeeSequenceGenerator(seq);

  return (
    write
      .mapArguments((value: GValue): [payload: TuyaZigbeeTyDataRequestPayload] => {
        return [
          {
            seq: getSeq(),
            dataPoints: [
              {
                id: dataPointId,
                type: dataPointType,
                value,
              },
            ],
          },
        ];
      })
      // TODO compare values ?
      .then((): void => {})
  );
}
