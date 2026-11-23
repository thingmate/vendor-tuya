import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPoints } from '../../../../../data-points/codec/decode-tuya-zigbee-data-points.js';
import { type TuyaZigbeeTyDataReportPayload } from '../tuya-zigbee-ty-data-report-payload.ts';

export function decodeTuyaZigbeeTyDataReportPayload(
  decoder: Decoder,
): TuyaZigbeeTyDataReportPayload {
  return { seq: decoder.uint16BE(), dataPoints: decodeTuyaZigbeeDataPoints(decoder) };
}
