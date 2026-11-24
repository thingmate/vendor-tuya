import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.ts';

/**
 * Encodes a string data point value.
 *
 * Characters are encoded as single bytes (latin-1), like zigbee2mqtt does.
 */
export function encodeTuyaZigbeeDataPointDataTypeString(encoder: Encoder, input: string): void {
  // from zigbee-herdsman-converters
  encoder
    .encode(input.length, encodeTuyaZigbeeDataPointDataLength)
    .string(input, { encoding: 'binary' });
}
