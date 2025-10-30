import {
  createSendZigbeeEmptyPayloadUsingSendZigbeePredefinedCommand,
  type SendZigbeePredefinedCommand,
} from '@thingmate/zigbee';
import {
  TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x03_PREDEFINED_PROPERTIES,
  type TuyaZigbeeCluster0xef00Command0x03PredefinedProperties,
} from '../../../../../tuya-zigbee-cluster-0xef00-command-0x03.js';
import { type SendTuyaZigbeeTyDataQueryCommand } from '../../send-tuya-zigbee-ty-data-query-command.js';

export interface CreateSendTuyaZigbeeTyDataQueryCommandUsingSendZigbeePredefinedCommandOptions {
  readonly send: SendZigbeePredefinedCommand<TuyaZigbeeCluster0xef00Command0x03PredefinedProperties>;
}

export function createSendTuyaZigbeeTyDataQueryCommandUsingSendZigbeePredefinedCommand({
  send,
}: CreateSendTuyaZigbeeTyDataQueryCommandUsingSendZigbeePredefinedCommandOptions): SendTuyaZigbeeTyDataQueryCommand {
  return createSendZigbeeEmptyPayloadUsingSendZigbeePredefinedCommand({
    send,
    commandPredefinedProperties: TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x03_PREDEFINED_PROPERTIES,
  });
}
