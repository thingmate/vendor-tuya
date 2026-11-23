import {
  TuyaZigbeeCommand,
  type TuyaZigbeeCommandStream,
} from '../../command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_TY_DATA_REPONSE_COMMAND_ARGUMENTS_MAPPER } from './arguments/tuya-zigbee-ty-data-response-command-arguments-mapper.ts';
import type { TuyaZigbeeTyDataResponseCommandArguments } from './arguments/tuya-zigbee-ty-data-response-command-arguments.ts';

export class TuyaZigbeeTyDataResponseCommand extends TuyaZigbeeCommand<TuyaZigbeeTyDataResponseCommandArguments> {
  constructor(stream: TuyaZigbeeCommandStream) {
    super(stream, 'server-to-client', 0x01, TUYA_ZIGBEE_TY_DATA_REPONSE_COMMAND_ARGUMENTS_MAPPER);
  }
}
