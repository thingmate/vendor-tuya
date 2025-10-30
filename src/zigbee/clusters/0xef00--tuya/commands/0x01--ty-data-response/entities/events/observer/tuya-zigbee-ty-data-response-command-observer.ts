import { type ZigbeeDecodedPayloadObserver } from '@thingmate/zigbee';
import { type TuyaZigbeeTyDataResponsePayload } from '../../../types/tuya-zigbee-ty-data-response-payload/tuya-zigbee-ty-data-response-payload.js';

export type TuyaZigbeeTyDataResponseCommandObserver =
  ZigbeeDecodedPayloadObserver<TuyaZigbeeTyDataResponsePayload>;
