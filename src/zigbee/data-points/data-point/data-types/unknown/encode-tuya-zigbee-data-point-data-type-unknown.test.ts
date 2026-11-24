import { Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_RAW } from '../0x00-raw/tuya-zigbee-data-point-type-raw.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN } from '../0x01-boolean/tuya-zigbee-data-point-type-boolean.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from '../0x02-uint32/tuya-zigbee-data-point-type-uint32.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_STRING } from '../0x03-string/tuya-zigbee-data-point-type-string.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM } from '../0x04-enum/tuya-zigbee-data-point-type-enum.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP } from '../0x05-bitmap/tuya-zigbee-data-point-type-bitmap.constant.ts';
import { type TuyaZigbeeDataPointType } from '../tuya-zigbee-data-point-type.ts';
import { encodeTuyaZigbeeDataPointDataTypeUnknown } from './encode-tuya-zigbee-data-point-data-type-unknown.ts';

describe('encodeTuyaZigbeeDataPointDataTypeUnknown', (): void => {
  test('dispatches each supported data type to its own codec.', (): void => {
    // per data type: the value to encode and the expected bytes (length prefix + value)
    const cases: readonly [
      dataType: TuyaZigbeeDataPointType,
      value: unknown,
      expected: Uint8Array,
    ][] = [
      [TUYA_ZIGBEE_DATA_POINT_TYPE_RAW, new Uint8Array([0xaa]), new Uint8Array([0x00, 0x01, 0xaa])],
      [TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN, true, new Uint8Array([0x00, 0x01, 0x01])],
      [TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32, 1, new Uint8Array([0x00, 0x04, 0x00, 0x00, 0x00, 0x01])],
      [TUYA_ZIGBEE_DATA_POINT_TYPE_STRING, 'ok', new Uint8Array([0x00, 0x02, 0x6f, 0x6b])],
      [TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM, 0x07, new Uint8Array([0x00, 0x01, 0x07])],
      [
        TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP,
        { length: 2, value: 0xff },
        new Uint8Array([0x00, 0x02, 0x00, 0xff]),
      ],
    ];

    for (const [dataType, value, expected] of cases) {
      expect(
        Encoder.encode(value, (encoder: Encoder): void => {
          encodeTuyaZigbeeDataPointDataTypeUnknown(encoder, dataType, value);
        }),
        `type ${dataType}`,
      ).toEqual(expected);
    }
  });

  test('throws for an unsupported data type.', (): void => {
    expect((): void => {
      encodeTuyaZigbeeDataPointDataTypeUnknown(
        new Encoder(),
        0x99 as TuyaZigbeeDataPointType,
        undefined,
      );
    }).toThrow('Unsupported tuya data type: 153.');
  });
});
