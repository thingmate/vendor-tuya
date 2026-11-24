import {
  TuyaZigbeeCommand,
  type TuyaZigbeeCommandStream,
} from '../../command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_TY_DATA_REQUEST_COMMAND_ARGUMENTS_MAPPER } from './arguments/tuya-zigbee-ty-data-request-command-arguments-mapper.ts';
import type { TuyaZigbeeTyDataRequestCommandArguments } from './arguments/tuya-zigbee-ty-data-request-command-arguments.ts';

/**
 * `TY_DATA_REQUEST` (0x00): the gateway sends data points to the device.
 * The device acknowledges it with a `TY_DATA_RESPONSE` echoing the sequence number.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
export class TuyaZigbeeTyDataRequestCommand extends TuyaZigbeeCommand<TuyaZigbeeTyDataRequestCommandArguments> {
  constructor(stream: TuyaZigbeeCommandStream) {
    super(stream, 'client-to-server', 0x00, TUYA_ZIGBEE_TY_DATA_REQUEST_COMMAND_ARGUMENTS_MAPPER);
  }
}
