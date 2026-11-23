import { Encoder } from '@xstd/codec';
import { expect, test } from 'vitest';
import { encodeTuyaZigbeeDataPointDataTypeRaw } from './encode-tuya-zigbee-data-point-data-type-raw.ts';

test('encodes the raw bytes after the 2-byte big-endian length prefix.', (): void => {
  expect(Encoder.encode(new Uint8Array([0xaa, 0xbb]), encodeTuyaZigbeeDataPointDataTypeRaw)).toEqual(
    new Uint8Array([0x00, 0x02, 0xaa, 0xbb]),
  );
});

test('encodes an empty raw value.', (): void => {
  expect(Encoder.encode(new Uint8Array([]), encodeTuyaZigbeeDataPointDataTypeRaw)).toEqual(
    new Uint8Array([0x00, 0x00]),
  );
});
