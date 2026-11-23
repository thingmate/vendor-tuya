/**
 * A bitmap data point value: a big-endian bit field on 1, 2 or 4 bytes.
 * The `length` selects the wire size of the `value`.
 */
export interface TuyaZigbeeDataPointTypeBitmap {
  readonly length: TuyaZigbeeDataPointTypeBitmapLength;
  readonly value: number;
}

/**
 * Wire sizes a bitmap data point value may occupy.
 */
export type TuyaZigbeeDataPointTypeBitmapLength = 1 | 2 | 4;
