import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPoint } from '../data-point/codec/decode-tuya-zigbee-data-point.ts';
import { type TuyaZigbeeDataPoint } from '../data-point/tuya-zigbee-data-point.ts';

/**
 * Decodes consecutive data points until the payload is exhausted.
 */
export function decodeTuyaZigbeeDataPoints(decoder: Decoder): TuyaZigbeeDataPoint[] {
  const dataPoints: TuyaZigbeeDataPoint[] = [];

  while (!decoder.done) {
    dataPoints.push(decodeTuyaZigbeeDataPoint(decoder));
  }

  return dataPoints;
}
