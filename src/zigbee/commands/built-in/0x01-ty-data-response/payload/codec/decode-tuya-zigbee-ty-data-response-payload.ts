import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPoints } from '../../../../../data-points/codec/decode-tuya-zigbee-data-points.js';
import { type TuyaZigbeeTyDataResponsePayload } from '../tuya-zigbee-ty-data-response-payload.js';

/**
 * Decodes a `TY_DATA_RESPONSE` payload: `seq (2 bytes) | data points`.
 */
export function decodeTuyaZigbeeTyDataResponsePayload(
  decoder: Decoder,
): TuyaZigbeeTyDataResponsePayload {
  return { seq: decoder.uint16BE(), dataPoints: decodeTuyaZigbeeDataPoints(decoder) };
}
