import { Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { encodeTuyaZigbeeDataPointDataTypeString } from './encode-tuya-zigbee-data-point-data-type-string.ts';

describe('encodeTuyaZigbeeDataPointDataTypeString', (): void => {
  test('encodes single-byte characters.', (): void => {
    expect(Encoder.encode('abc', encodeTuyaZigbeeDataPointDataTypeString)).toEqual(
      new Uint8Array([0x00, 0x03, 0x61, 0x62, 0x63]),
    );
  });

  test('encodes latin-1 characters as their single byte.', (): void => {
    expect(Encoder.encode('é', encodeTuyaZigbeeDataPointDataTypeString)).toEqual(
      new Uint8Array([0x00, 0x01, 0xe9]),
    );
  });
});
