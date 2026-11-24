import { Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { encodeTuyaZigbeeDataPointDataTypeEnum } from './encode-tuya-zigbee-data-point-data-type-enum.ts';

describe('encodeTuyaZigbeeDataPointDataTypeEnum', (): void => {
  test('encodes an enumeration value.', (): void => {
    expect(Encoder.encode(0x07, encodeTuyaZigbeeDataPointDataTypeEnum)).toEqual(
      new Uint8Array([0x00, 0x01, 0x07]),
    );
  });

  test('encodes the maximum enumeration value.', (): void => {
    expect(Encoder.encode(0xff, encodeTuyaZigbeeDataPointDataTypeEnum)).toEqual(
      new Uint8Array([0x00, 0x01, 0xff]),
    );
  });
});
