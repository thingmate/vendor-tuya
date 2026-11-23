import { VOID_ARGUMENTS_ZCL_PAYLOAD_MAPPER, type VoidArguments } from '@thingmate/zigbee';
import {
  TuyaZigbeeCommand,
  type TuyaZigbeeCommandStream,
} from '../../command/tuya-zigbee-command.ts';

export class TuyaZigbeeTyDataQueryCommand extends TuyaZigbeeCommand<VoidArguments> {
  constructor(stream: TuyaZigbeeCommandStream) {
    super(stream, 'client-to-server', 0x03, VOID_ARGUMENTS_ZCL_PAYLOAD_MAPPER);
  }
}
