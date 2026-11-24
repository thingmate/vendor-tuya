import {
  TuyaZigbeeCommand,
  type TuyaZigbeeCommandStream,
} from '../../command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_TY_DATA_REPORT_COMMAND_ARGUMENTS_MAPPER } from './arguments/tuya-zigbee-ty-data-report-command-arguments-mapper.ts';
import type { TuyaZigbeeTyDataReportCommandArguments } from './arguments/tuya-zigbee-ty-data-report-command-arguments.ts';

/**
 * `TY_DATA_REPORT` (0x02): the device proactively reports data points to the gateway.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
export class TuyaZigbeeTyDataReportCommand extends TuyaZigbeeCommand<TuyaZigbeeTyDataReportCommandArguments> {
  constructor(stream: TuyaZigbeeCommandStream) {
    super(stream, 'server-to-client', 0x02, TUYA_ZIGBEE_TY_DATA_REPORT_COMMAND_ARGUMENTS_MAPPER);
  }
}
