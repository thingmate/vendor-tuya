import { createSendZigbeeDecodedPayloadActionUsingSendZigbeeCommandForPredefinedPropertiesAction } from '@thingmate/zigbee';
import { type SendZigbeeCommandForPredefinedPropertiesAction } from '@thingmate/zigbee/';
import { encodeTuyaZigbeeTyDataRequestPayload } from '../../../../../members/tuya-zigbee-ty-data-request-payload/codec/encode-tuya-zigbee-ty-data-request-payload.js';
import type { TuyaZigbeeTyDataRequestPayload } from '../../../../../members/tuya-zigbee-ty-data-request-payload/tuya-zigbee-ty-data-request-payload.js';
import {
  TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x00_PREDEFINED_PROPERTIES,
  type TuyaZigbeeCluster0xef00Command0x00PredefinedProperties,
} from '../../../../../tuya-zigbee-cluster-0xef00-command-0x00.js';
import { type SendTuyaZigbeeTyDataRequestCommandAction } from '../../send-tuya-zigbee-ty-data-request-command.action.js';

export interface CreateSendTuyaZigbeeTyDataRequestCommandActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions {
  readonly send: SendZigbeeCommandForPredefinedPropertiesAction<TuyaZigbeeCluster0xef00Command0x00PredefinedProperties>;
}

export function createSendTuyaZigbeeTyDataRequestCommandActionUsingSendZigbeeCommandForPredefinedPropertiesAction({
  send,
}: CreateSendTuyaZigbeeTyDataRequestCommandActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions): SendTuyaZigbeeTyDataRequestCommandAction {
  return createSendZigbeeDecodedPayloadActionUsingSendZigbeeCommandForPredefinedPropertiesAction<
    TuyaZigbeeCluster0xef00Command0x00PredefinedProperties,
    TuyaZigbeeTyDataRequestPayload
  >({
    send,
    commandPredefinedProperties: TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x00_PREDEFINED_PROPERTIES,
    encode: encodeTuyaZigbeeTyDataRequestPayload,
  });
}
