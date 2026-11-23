import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPoints } from '../../../../../data-points/codec/decode-tuya-zigbee-data-points.js';
import { type TuyaZigbeeTyDataResponsePayload } from '../tuya-zigbee-ty-data-response-payload.js';

export function decodeTuyaZigbeeTyDataResponsePayload(
  decoder: Decoder,
): TuyaZigbeeTyDataResponsePayload {
  return { seq: decoder.uint16BE(), dataPoints: decodeTuyaZigbeeDataPoints(decoder) };
}
