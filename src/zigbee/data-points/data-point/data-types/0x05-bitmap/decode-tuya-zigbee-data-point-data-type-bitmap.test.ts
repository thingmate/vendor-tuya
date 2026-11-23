import { Decoder } from '@xstd/codec';
import { expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPointDataTypeBitmap } from './decode-tuya-zigbee-data-point-data-type-bitmap.ts';

test('rejects an invalid bitmap length.', (): void => {
  // a bitmap data point declaring 3 data bytes (valid lengths are 1, 2 or 4), followed by 4 bytes
  const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x03, 0xaa, 0xbb, 0xcc, 0xdd]));

  expect((): void => {
    decodeTuyaZigbeeDataPointDataTypeBitmap(decoder);
  }).toThrow('Invalid length.');
});
