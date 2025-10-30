import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPoints } from '../../../../../data-points/codec/encode-tuya-zigbee-data-points.js';
import { type TuyaZigbeeTyDataReportPayload } from '../tuya-zigbee-ty-data-report-payload.js';

export function encodeTuyaZigbeeTyDataReportPayload(
  encoder: Encoder,
  { seq, dataPoints }: TuyaZigbeeTyDataReportPayload,
): void {
  encoder.uint16BE(seq).encode(dataPoints, encodeTuyaZigbeeDataPoints);
}
