import { type SendZigbeeDecodedPayload } from '@thingmate/zigbee';
import { type TuyaZigbeeTyDataRequestPayload } from '../../../types/tuya-zigbee-ty-data-request-payload/tuya-zigbee-ty-data-request-payload.js';

export type SendTuyaZigbeeTyDataRequestCommand =
  SendZigbeeDecodedPayload<TuyaZigbeeTyDataRequestPayload>;
