import { type Abortable } from '@xstd/abortable';
import { createTuyaZigbeeSequenceGenerator } from '../../../../../../../sequence/generator/implementations/create-tuya-zigbee-sequence-generator.js';
import { type TuyaZigbeeSequenceLike } from '../../../../../../../sequence/generator/implementations/tuya-zigbee-sequence-like.js';
import { type TuyaZigbeeSequenceGenerator } from '../../../../../../../sequence/generator/tuya-zigbee-sequence-generator.js';
import { type WriteTuyaZigbeeDataPoints } from '../../../../../../entities/actions/write-data-points/write-tuya-zigbee-data-points.js';
import { type TuyaZigbeeDataPointType } from '../../../../../data-types/tuya-zigbee-data-point-type.js';
import { type WriteTuyaZigbeeDataPoint } from '../../write-tuya-zigbee-data-point.js';

export interface CreateWriteTuyaZigbeeDataPointUsingWriteTuyaZigbeeDataPointsOptions {
  readonly write: WriteTuyaZigbeeDataPoints;
  // dataPoint
  readonly dataPointId: number /* u8 */;
  readonly dataPointType: TuyaZigbeeDataPointType; // u8;
  readonly seq?: TuyaZigbeeSequenceLike | undefined;
}

export function createWriteTuyaZigbeeDataPointUsingWriteTuyaZigbeeDataPoints<GValue>({
  write,
  seq,
  dataPointId,
  dataPointType,
}: CreateWriteTuyaZigbeeDataPointUsingWriteTuyaZigbeeDataPointsOptions): WriteTuyaZigbeeDataPoint<GValue> {
  const getSeq: TuyaZigbeeSequenceGenerator = createTuyaZigbeeSequenceGenerator(seq);

  return async (value: GValue, options?: Abortable): Promise<void> => {
    /*const _responsePayload: TuyaZigbeeTyDataResponsePayload = */await write(
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
      options,
    );

    // TODO compare values ?
  };
}
