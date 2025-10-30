import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPoint } from '../data-point/codec/decode-tuya-zigbee-data-point.js';
import { type TuyaZigbeeDataPoint } from '../data-point/tuya-zigbee-data-point.js';

export function decodeTuyaZigbeeDataPoints(decoder: Decoder): TuyaZigbeeDataPoint[] {
  const dataPoints: TuyaZigbeeDataPoint[] = [];

  while (!decoder.done) {
    dataPoints.push(decodeTuyaZigbeeDataPoint(decoder));
  }

  return dataPoints;
}
