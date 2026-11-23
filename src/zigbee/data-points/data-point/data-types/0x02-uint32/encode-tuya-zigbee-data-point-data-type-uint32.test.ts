import { Encoder } from '@xstd/codec';
import { expect, test } from 'vitest';
import { encodeTuyaZigbeeDataPointDataTypeUint32 } from './encode-tuya-zigbee-data-point-data-type-uint32.ts';

test('encodes a big-endian uint32 value.', (): void => {
  expect(Encoder.encode(0x8000_0000, encodeTuyaZigbeeDataPointDataTypeUint32)).toEqual(
    new Uint8Array([0x00, 0x04, 0x80, 0x00, 0x00, 0x00]),
  );
});

test('encodes the maximum uint32 value.', (): void => {
  expect(Encoder.encode(0xffff_ffff, encodeTuyaZigbeeDataPointDataTypeUint32)).toEqual(
    new Uint8Array([0x00, 0x04, 0xff, 0xff, 0xff, 0xff]),
  );
});
