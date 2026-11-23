import { Encoder } from '@xstd/codec';
import { expect, test } from 'vitest';
import { encodeTuyaZigbeeDataPointDataTypeBoolean } from './encode-tuya-zigbee-data-point-data-type-boolean.ts';

test('encodes true as 0x01.', (): void => {
  expect(Encoder.encode(true, encodeTuyaZigbeeDataPointDataTypeBoolean)).toEqual(
    new Uint8Array([0x00, 0x01, 0x01]),
  );
});

test('encodes false as 0x00.', (): void => {
  expect(Encoder.encode(false, encodeTuyaZigbeeDataPointDataTypeBoolean)).toEqual(
    new Uint8Array([0x00, 0x01, 0x00]),
  );
});
