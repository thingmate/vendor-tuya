import { describe, expect, test } from 'vitest';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from './0x02-uint32/tuya-zigbee-data-point-type-uint32.constant.ts';
import { inferTuyaZigbeeDataPointType } from './infer-tuya-zigbee-data-point-type.ts';

describe('inferTuyaZigbeeDataPointType', (): void => {
  test('infers the uint32 data point type for the maximum uint32 value.', (): void => {
    expect(inferTuyaZigbeeDataPointType(0xffff_ffff)).toBe(TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32);
  });
});
