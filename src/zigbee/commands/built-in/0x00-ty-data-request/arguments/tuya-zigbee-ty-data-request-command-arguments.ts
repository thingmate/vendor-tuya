import type { TuyaZigbeeTyDataRequestPayload } from '../payload/tuya-zigbee-ty-data-request-payload.ts';

/**
 * Command arguments of a `TY_DATA_REQUEST`: a single `TY_DATA_REQUEST` payload.
 */
export type TuyaZigbeeTyDataRequestCommandArguments = readonly [
  payload: TuyaZigbeeTyDataRequestPayload,
];
