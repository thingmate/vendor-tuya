export interface TuyaZigbeeDataPointTypeBitmap {
  readonly length: TuyaZigbeeDataPointTypeBitmapLength;
  readonly value: number;
}

export type TuyaZigbeeDataPointTypeBitmapLength = 1 | 2 | 4;
