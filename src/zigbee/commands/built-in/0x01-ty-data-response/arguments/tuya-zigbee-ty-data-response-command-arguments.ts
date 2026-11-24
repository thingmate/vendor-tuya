import type { TuyaZigbeeTyDataResponsePayload } from '../payload/tuya-zigbee-ty-data-response-payload.ts';

/**
 * Command arguments of a `TY_DATA_RESPONSE`: a single `TY_DATA_RESPONSE` payload.
 */
export type TuyaZigbeeTyDataResponseCommandArguments = readonly [
  payload: TuyaZigbeeTyDataResponsePayload,
];
