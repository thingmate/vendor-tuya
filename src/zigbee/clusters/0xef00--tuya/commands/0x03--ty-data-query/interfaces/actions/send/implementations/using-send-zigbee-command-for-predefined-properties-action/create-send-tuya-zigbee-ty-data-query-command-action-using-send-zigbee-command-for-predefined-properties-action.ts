import {
  createSendZigbeeEmptyPayloadActionUsingSendZigbeeCommandForPredefinedPropertiesAction,
  type SendZigbeeCommandForPredefinedPropertiesAction,
} from '@thingmate/zigbee';
import {
  TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x03_PREDEFINED_PROPERTIES,
  type TuyaZigbeeCluster0xef00Command0x03PredefinedProperties,
} from '../../../../../tuya-zigbee-cluster-0xef00-command-0x03.js';
import { type SendTuyaZigbeeTyDataQueryCommandAction } from '../../send-tuya-zigbee-ty-data-query-command.action.js';

export interface CreateSendTuyaZigbeeTyDataQueryCommandActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions {
  readonly send: SendZigbeeCommandForPredefinedPropertiesAction<TuyaZigbeeCluster0xef00Command0x03PredefinedProperties>;
}

export function createSendTuyaZigbeeTyDataQueryCommandActionUsingSendZigbeeCommandForPredefinedPropertiesAction({
  send,
}: CreateSendTuyaZigbeeTyDataQueryCommandActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions): SendTuyaZigbeeTyDataQueryCommandAction {
  return createSendZigbeeEmptyPayloadActionUsingSendZigbeeCommandForPredefinedPropertiesAction({
    send,
    commandPredefinedProperties: TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x03_PREDEFINED_PROPERTIES,
  });
}
