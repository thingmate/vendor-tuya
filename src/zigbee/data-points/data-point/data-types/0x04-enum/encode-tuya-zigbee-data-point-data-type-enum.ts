import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.ts';

/**
 * Encodes an enumeration data point value (0 to 255) as a single byte.
 */
export function encodeTuyaZigbeeDataPointDataTypeEnum(encoder: Encoder, input: number): void {
  encoder.encode(1, encodeTuyaZigbeeDataPointDataLength).uint8(input);
}
