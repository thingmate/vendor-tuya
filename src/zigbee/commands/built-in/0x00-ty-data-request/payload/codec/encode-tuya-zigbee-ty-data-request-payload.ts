import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPoints } from '../../../../../data-points/codec/encode-tuya-zigbee-data-points.js';
import { type TuyaZigbeeTyDataRequestPayload } from '../tuya-zigbee-ty-data-request-payload.js';

export function encodeTuyaZigbeeTyDataRequestPayload(
  encoder: Encoder,
  { seq, dataPoints }: TuyaZigbeeTyDataRequestPayload,
): void {
  encoder.uint16BE(seq).encode(dataPoints, encodeTuyaZigbeeDataPoints);
}
