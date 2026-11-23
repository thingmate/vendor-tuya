import {
  TuyaZigbeeCommand,
  type TuyaZigbeeCommandStream,
} from '../../command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_TY_DATA_REQUEST_COMMAND_ARGUMENTS_MAPPER } from './arguments/tuya-zigbee-ty-data-request-command-arguments-mapper.ts';
import type { TuyaZigbeeTyDataRequestCommandArguments } from './arguments/tuya-zigbee-ty-data-request-command-arguments.ts';

export class TuyaZigbeeTyDataRequestCommand extends TuyaZigbeeCommand<TuyaZigbeeTyDataRequestCommandArguments> {
  constructor(stream: TuyaZigbeeCommandStream) {
    super(stream, 'client-to-server', 0x00, TUYA_ZIGBEE_TY_DATA_REQUEST_COMMAND_ARGUMENTS_MAPPER);
  }
}
