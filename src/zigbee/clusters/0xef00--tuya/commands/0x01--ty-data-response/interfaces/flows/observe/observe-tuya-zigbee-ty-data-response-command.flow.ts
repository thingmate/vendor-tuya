import { type ObserveZigbeeDecodedPayloadFlow } from '@thingmate/zigbee';
import { type TuyaZigbeeTyDataResponsePayload } from '../../../members/tuya-zigbee-ty-data-response-payload/tuya-zigbee-ty-data-response-payload.js';

export type ObserveTuyaZigbeeTyDataResponseCommandFlow =
  ObserveZigbeeDecodedPayloadFlow<TuyaZigbeeTyDataResponsePayload>;
