import { describe, expect, test } from 'vitest';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_RAW } from './0x00-raw/tuya-zigbee-data-point-type-raw.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN } from './0x01-boolean/tuya-zigbee-data-point-type-boolean.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from './0x02-uint32/tuya-zigbee-data-point-type-uint32.constant.ts';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_STRING } from './0x03-string/tuya-zigbee-data-point-type-string.constant.ts';
import { inferTuyaZigbeeDataPointType } from './infer-tuya-zigbee-data-point-type.ts';

describe('inferTuyaZigbeeDataPointType', (): void => {
  test('infers the raw data point type for Uint8Array values.', (): void => {
    expect(inferTuyaZigbeeDataPointType(new Uint8Array([0xaa]))).toBe(
      TUYA_ZIGBEE_DATA_POINT_TYPE_RAW,
    );
  });

  test('infers the boolean data point type for boolean values.', (): void => {
    expect(inferTuyaZigbeeDataPointType(true)).toBe(TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN);
  });

  test('infers the uint32 data point type for the maximum uint32 value.', (): void => {
    expect(inferTuyaZigbeeDataPointType(0xffff_ffff)).toBe(TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32);
  });

  test('infers the string data point type for string values.', (): void => {
    expect(inferTuyaZigbeeDataPointType('on')).toBe(TUYA_ZIGBEE_DATA_POINT_TYPE_STRING);
  });

  test('throws for a non-integer number.', (): void => {
    expect((): void => {
      inferTuyaZigbeeDataPointType(1.5);
    }).toThrow(new RangeError('Only uint32 number is supported.'));
  });

  test('throws for a negative number.', (): void => {
    expect((): void => {
      inferTuyaZigbeeDataPointType(-1);
    }).toThrow(new RangeError('Only uint32 number is supported.'));
  });

  test('throws for a number above the uint32 range.', (): void => {
    expect((): void => {
      inferTuyaZigbeeDataPointType(0x1_0000_0000);
    }).toThrow(new RangeError('Only uint32 number is supported.'));
  });

  test("throws for any other value's type.", (): void => {
    expect((): void => {
      inferTuyaZigbeeDataPointType(null);
    }).toThrow(new Error("Unable to infer value's type."));
  });
});
