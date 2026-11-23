import { type TuyaZigbeeDataPointType } from './data-types/tuya-zigbee-data-point-type.ts';

/**
 * A Tuya data point, as carried by the private cluster commands:
 * `dpid (1 byte) | type (1 byte) | len (2 bytes) | value`.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
export interface TuyaZigbeeDataPoint {
  /** Id of the data point (`0` to `255`). */
  readonly id: number; // u8;
  /** Wire data type of the value, defining how `len` and the value bytes are interpreted. */
  readonly type: TuyaZigbeeDataPointType; // u8;
  /** Decoded value; its runtime type depends on the data point `type`. */
  readonly value: unknown;
}
