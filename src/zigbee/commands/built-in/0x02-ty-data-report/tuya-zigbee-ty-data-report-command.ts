import {
  TuyaZigbeeCommand,
  type TuyaZigbeeCommandStream,
} from '../../command/tuya-zigbee-command.ts';
import { TUYA_ZIGBEE_TY_DATA_REPORT_COMMAND_ARGUMENTS_MAPPER } from './arguments/tuya-zigbee-ty-data-report-command-arguments-mapper.ts';
import type { TuyaZigbeeTyDataReportCommandArguments } from './arguments/tuya-zigbee-ty-data-report-command-arguments.ts';

export class TuyaZigbeeTyDataReportCommand extends TuyaZigbeeCommand<TuyaZigbeeTyDataReportCommandArguments> {
  constructor(stream: TuyaZigbeeCommandStream) {
    super(stream, 'server-to-client', 0x02, TUYA_ZIGBEE_TY_DATA_REPORT_COMMAND_ARGUMENTS_MAPPER);
  }
}
