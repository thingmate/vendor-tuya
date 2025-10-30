import {
  createSendZigbeeDecodedPayloadUsingSendZigbeePredefinedCommand,
  type SendZigbeePredefinedCommand,
} from '@thingmate/zigbee';
import {
  TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x00_PREDEFINED_PROPERTIES,
  type TuyaZigbeeCluster0xef00Command0x00PredefinedProperties,
} from '../../../../../tuya-zigbee-cluster-0xef00-command-0x00.js';
import { encodeTuyaZigbeeTyDataRequestPayload } from '../../../../../types/tuya-zigbee-ty-data-request-payload/codec/encode-tuya-zigbee-ty-data-request-payload.js';
import { type SendTuyaZigbeeTyDataRequestCommand } from '../../send-tuya-zigbee-ty-data-request-command.js';

export interface CreateSendTuyaZigbeeTyDataRequestCommandUsingSendZigbeePredefinedCommandOptions {
  readonly send: SendZigbeePredefinedCommand<TuyaZigbeeCluster0xef00Command0x00PredefinedProperties>;
}

export function createSendTuyaZigbeeTyDataRequestCommandUsingSendZigbeePredefinedCommand({
  send,
}: CreateSendTuyaZigbeeTyDataRequestCommandUsingSendZigbeePredefinedCommandOptions): SendTuyaZigbeeTyDataRequestCommand {
  return createSendZigbeeDecodedPayloadUsingSendZigbeePredefinedCommand({
    send,
    commandPredefinedProperties: TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x00_PREDEFINED_PROPERTIES,
    encode: encodeTuyaZigbeeTyDataRequestPayload,
  });
}
