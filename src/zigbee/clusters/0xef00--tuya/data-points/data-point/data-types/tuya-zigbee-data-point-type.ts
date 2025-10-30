export type TuyaZigbeeDataPointType =
  | 0 // raw
  | 1 // boolean
  | 2 // value (uint32, be)
  | 3 // string
  | 4 // enum
  | 5; // bitmap
