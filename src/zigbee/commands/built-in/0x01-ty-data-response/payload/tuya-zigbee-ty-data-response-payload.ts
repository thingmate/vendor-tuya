import { type TuyaZigbeeDataPoint } from '../../../../data-points/data-point/tuya-zigbee-data-point.js';

/**
 * Payload of a `TY_DATA_RESPONSE` (0x01) command: the sequence number of the
 * acknowledged `TY_DATA_REQUEST`, followed by the data points applied by the device.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
export interface TuyaZigbeeTyDataResponsePayload {
  /** Sequence number of the acknowledged `TY_DATA_REQUEST`. */
  readonly seq: number; // u16;
  readonly dataPoints: readonly TuyaZigbeeDataPoint[]; // NOTE: some devices don't support multiple dataPoints
}
