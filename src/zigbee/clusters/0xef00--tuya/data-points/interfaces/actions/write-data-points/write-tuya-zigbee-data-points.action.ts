import { type Action } from '@xstd/action';
import { type TuyaZigbeeTyDataRequestPayload } from '../../../../commands/0x00--ty-data-request/members/tuya-zigbee-ty-data-request-payload/tuya-zigbee-ty-data-request-payload.js';
import { type TuyaZigbeeTyDataResponsePayload } from '../../../../commands/0x01--ty-data-response/members/tuya-zigbee-ty-data-response-payload/tuya-zigbee-ty-data-response-payload.js';

export type WriteTuyaZigbeeDataPointsAction = Action<
  [payload: TuyaZigbeeTyDataRequestPayload],
  TuyaZigbeeTyDataResponsePayload
>;
