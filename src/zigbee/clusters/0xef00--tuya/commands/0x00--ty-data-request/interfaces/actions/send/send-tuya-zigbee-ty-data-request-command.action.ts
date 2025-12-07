import { type SendZigbeeDecodedPayloadAction } from '@thingmate/zigbee';
import { type TuyaZigbeeTyDataRequestPayload } from '../../../members/tuya-zigbee-ty-data-request-payload/tuya-zigbee-ty-data-request-payload.js';

export type SendTuyaZigbeeTyDataRequestCommandAction =
  SendZigbeeDecodedPayloadAction<TuyaZigbeeTyDataRequestPayload>;
