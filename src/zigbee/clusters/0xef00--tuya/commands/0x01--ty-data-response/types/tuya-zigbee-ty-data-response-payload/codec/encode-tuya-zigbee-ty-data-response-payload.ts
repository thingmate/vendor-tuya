import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPoints } from '../../../../../data-points/codec/encode-tuya-zigbee-data-points.js';
import { type TuyaZigbeeTyDataResponsePayload } from '../tuya-zigbee-ty-data-response-payload.js';

export function encodeTuyaZigbeeTyDataResponsePayload(
  encoder: Encoder,
  { seq, dataPoints }: TuyaZigbeeTyDataResponsePayload,
): void {
  encoder.uint16BE(seq).encode(dataPoints, encodeTuyaZigbeeDataPoints);
}
