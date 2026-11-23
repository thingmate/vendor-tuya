import type { TuyaZigbeeTyDataReportPayload } from '../payload/tuya-zigbee-ty-data-report-payload.ts';

/**
 * Command arguments of a `TY_DATA_REPORT`: a single `TY_DATA_REPORT` payload.
 */
export type TuyaZigbeeTyDataReportCommandArguments = readonly [
  payload: TuyaZigbeeTyDataReportPayload,
];
