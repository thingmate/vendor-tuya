import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPoint } from '../data-point/codec/encode-tuya-zigbee-data-point.js';
import { type TuyaZigbeeDataPoint } from '../data-point/tuya-zigbee-data-point.js';

export function encodeTuyaZigbeeDataPoints(
  encoder: Encoder,
  dataPoints: readonly TuyaZigbeeDataPoint[],
): void {
  for (const dataPoint of dataPoints) {
    encodeTuyaZigbeeDataPoint(encoder, dataPoint);
  }
}
