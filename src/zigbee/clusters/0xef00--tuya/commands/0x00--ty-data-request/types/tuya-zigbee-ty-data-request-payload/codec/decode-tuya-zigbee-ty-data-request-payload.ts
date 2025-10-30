import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPoints } from '../../../../../data-points/codec/decode-tuya-zigbee-data-points.js';
import { type TuyaZigbeeTyDataRequestPayload } from '../tuya-zigbee-ty-data-request-payload.js';

export function decodeTuyaZigbeeTyDataRequestPayload(
  decoder: Decoder,
): TuyaZigbeeTyDataRequestPayload {
  return { seq: decoder.uint16BE(), dataPoints: decodeTuyaZigbeeDataPoints(decoder) };
}
