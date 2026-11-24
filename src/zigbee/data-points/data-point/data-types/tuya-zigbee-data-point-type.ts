/**
 * Wire data types of a Tuya data point value.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
export type TuyaZigbeeDataPointType =
  | 0 // raw
  | 1 // boolean
  | 2 // value (uint32, be)
  | 3 // string
  | 4 // enum
  | 5; // bitmap
