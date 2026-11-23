import { Decoder } from '@xstd/codec';
import { expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPointDataTypeBoolean } from './decode-tuya-zigbee-data-point-data-type-boolean.ts';

test('decodes 0x01 as true.', (): void => {
  // length 0x0001 (1 byte), followed by the boolean value
  const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x01, 0x01]));

  expect(decodeTuyaZigbeeDataPointDataTypeBoolean(decoder)).toBe(true);
  expect(decoder.done).toBe(true);
});

test('decodes 0x00 as false.', (): void => {
  const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x01, 0x00]));

  expect(decodeTuyaZigbeeDataPointDataTypeBoolean(decoder)).toBe(false);
  expect(decoder.done).toBe(true);
});

test('decodes any byte other than 0x01 as false.', (): void => {
  const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x01, 0x02]));

  expect(decodeTuyaZigbeeDataPointDataTypeBoolean(decoder)).toBe(false);
  expect(decoder.done).toBe(true);
});

test('rejects a length other than 1.', (): void => {
  // length 0x0002 (2 bytes), followed by 2 value bytes
  const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x02, 0x01, 0x01]));

  expect((): void => {
    decodeTuyaZigbeeDataPointDataTypeBoolean(decoder);
  }).toThrow('Invalid length.');
});
