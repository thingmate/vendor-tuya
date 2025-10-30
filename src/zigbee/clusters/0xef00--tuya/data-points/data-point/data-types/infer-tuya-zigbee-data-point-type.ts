import { type TuyaZigbeeDataPointType } from './tuya-zigbee-data-point-type.js';

export function inferTuyaZigbeeDataPointType(value: unknown): TuyaZigbeeDataPointType {
  if (value instanceof Uint8Array) {
    return 0; // raw
  }

  switch (typeof value) {
    case 'boolean':
      return 1; // boolean
    case 'number': {
      if (!Number.isInteger(value) || value < 0 || value >= 0xffff_ffff) {
        throw new RangeError('Only uint32 number is supported.');
      } else {
        return 2; // value (uint32, be)
      }
    }
    case 'string':
      return 3; // string
    default:
      throw new Error("Unable to infer value's type.");
  }
}
