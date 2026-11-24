import { Decoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_RAW } from '../0x00-raw/tuya-zigbee-data-point-type-raw.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN } from '../0x01-boolean/tuya-zigbee-data-point-type-boolean.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from '../0x02-uint32/tuya-zigbee-data-point-type-uint32.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_STRING } from '../0x03-string/tuya-zigbee-data-point-type-string.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM } from '../0x04-enum/tuya-zigbee-data-point-type-enum.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP } from '../0x05-bitmap/tuya-zigbee-data-point-type-bitmap.constant.ts';
import { type TuyaZigbeeDataPointType } from '../tuya-zigbee-data-point-type.ts';
import { decodeTuyaZigbeeDataPointDataTypeUnknown } from './decode-tuya-zigbee-data-point-data-type-unknown.ts';

describe('decodeTuyaZigbeeDataPointDataTypeUnknown', (): void => {
  test('dispatches each supported data type to its own codec.', (): void => {
    // per data type: the value bytes (length prefix + value) and the expected decoded value
    const cases: readonly [
      dataType: TuyaZigbeeDataPointType,
      bytes: Uint8Array,
      expected: unknown,
    ][] = [
      [TUYA_ZIGBEE_DATA_POINT_TYPE_RAW, new Uint8Array([0x00, 0x01, 0xaa]), new Uint8Array([0xaa])],
      [TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN, new Uint8Array([0x00, 0x01, 0x01]), true],
      [TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32, new Uint8Array([0x00, 0x04, 0x00, 0x00, 0x00, 0x01]), 1],
      [TUYA_ZIGBEE_DATA_POINT_TYPE_STRING, new Uint8Array([0x00, 0x02, 0x6f, 0x6b]), 'ok'],
      [TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM, new Uint8Array([0x00, 0x01, 0x07]), 0x07],
      [
        TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP,
        new Uint8Array([0x00, 0x02, 0x00, 0xff]),
        { length: 2, value: 0xff },
      ],
    ];

    for (const [dataType, bytes, expected] of cases) {
      const decoder: Decoder = new Decoder(bytes);

      expect(
        decodeTuyaZigbeeDataPointDataTypeUnknown(decoder, dataType),
        `type ${dataType}`,
      ).toEqual(expected);
      expect(decoder.done, `type ${dataType}`).toBe(true);
    }
  });

  test('throws for an unsupported data type.', (): void => {
    const decoder: Decoder = new Decoder(new Uint8Array([0x00]));

    expect((): void => {
      decodeTuyaZigbeeDataPointDataTypeUnknown(decoder, 0x99 as TuyaZigbeeDataPointType);
    }).toThrow('Unsupported tuya data type: 153.');
  });
});
