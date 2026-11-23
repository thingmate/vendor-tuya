import { Decoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { decodeTuyaZigbeeDataPointDataTypeString } from './decode-tuya-zigbee-data-point-data-type-string.ts';

describe('decodeTuyaZigbeeDataPointDataTypeString', (): void => {
  test('decodes single-byte characters.', (): void => {
    // length 0x0003 (3 bytes), followed by 'abc'
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x03, 0x61, 0x62, 0x63]));

    expect(decodeTuyaZigbeeDataPointDataTypeString(decoder)).toBe('abc');
    expect(decoder.done).toBe(true);
  });

  test('decodes latin-1 characters from their single byte.', (): void => {
    // length 0x0001 (1 byte), followed by 'é' encoded as 0xe9
    const decoder: Decoder = new Decoder(new Uint8Array([0x00, 0x01, 0xe9]));

    expect(decodeTuyaZigbeeDataPointDataTypeString(decoder)).toBe('é');
    expect(decoder.done).toBe(true);
  });
});
