import { type EntityAction } from '@thingmate/entity';
import { type TuyaZigbeeTyDataRequestPayload } from '../../../../commands/0x00--ty-data-request/types/tuya-zigbee-ty-data-request-payload/tuya-zigbee-ty-data-request-payload.js';
import { type TuyaZigbeeTyDataResponsePayload } from '../../../../commands/0x01--ty-data-response/types/tuya-zigbee-ty-data-response-payload/tuya-zigbee-ty-data-response-payload.js';

export type WriteTuyaZigbeeDataPoints = EntityAction<
  [payload: TuyaZigbeeTyDataRequestPayload],
  TuyaZigbeeTyDataResponsePayload
>;
