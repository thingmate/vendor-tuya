import { type ZigbeeDecodedPayloadObserver } from '@thingmate/zigbee';
import { type TuyaZigbeeTyDataReportPayload } from '../../../types/tuya-zigbee-ty-data-report-payload/tuya-zigbee-ty-data-report-payload.js';

export type TuyaZigbeeTyDataReportCommandObserver =
  ZigbeeDecodedPayloadObserver<TuyaZigbeeTyDataReportPayload>;
