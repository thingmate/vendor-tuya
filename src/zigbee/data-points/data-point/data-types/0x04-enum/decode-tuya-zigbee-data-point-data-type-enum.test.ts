import { Decoder } from '@xstd/codec';
import { expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPointDataTypeEnum } from './decode-tuya-zigbee-data-point-data-type-enum.ts';

test('decodes an enumeration value.', (): void => {
  // length 0x0001 (1 byte), followed by the enum value
  const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x01, 0x07]));

  expect(decodeTuyaZigbeeDataPointDataTypeEnum(decoder)).toBe(0x07);
  expect(decoder.done).toBe(true);
});

test('decodes the maximum enumeration value.', (): void => {
  const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x01, 0xff]));

  expect(decodeTuyaZigbeeDataPointDataTypeEnum(decoder)).toBe(0xff);
  expect(decoder.done).toBe(true);
});

test('rejects a length other than 1.', (): void => {
  // length 0x0002 (2 bytes), followed by 2 value bytes
  const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x02, 0x00, 0x07]));

  expect((): void => {
    decodeTuyaZigbeeDataPointDataTypeEnum(decoder);
  }).toThrow('Invalid length.');
});
