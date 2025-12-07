import { type ObserveZigbeeDecodedPayloadFlow } from '@thingmate/zigbee';
import { type TuyaZigbeeTyDataReportPayload } from '../../../members/tuya-zigbee-ty-data-report-payload/tuya-zigbee-ty-data-report-payload.js';

export type ObserveTuyaZigbeeTyDataReportCommandFlow =
  ObserveZigbeeDecodedPayloadFlow<TuyaZigbeeTyDataReportPayload>;
