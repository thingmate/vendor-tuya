import { type TuyaZigbeeDataPoint } from '../../../../data-points/data-point/tuya-zigbee-data-point.js';

/**
 * Payload of a `TY_DATA_REQUEST` (0x00) command: a transaction sequence number
 * followed by the data points to apply on the device.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
export interface TuyaZigbeeTyDataRequestPayload {
  /** Transaction sequence number, echoed back by the device in its `TY_DATA_RESPONSE`. */
  readonly seq: number; // u16;
  readonly dataPoints: readonly TuyaZigbeeDataPoint[]; // NOTE: some devices don't support multiple dataPoints
}
