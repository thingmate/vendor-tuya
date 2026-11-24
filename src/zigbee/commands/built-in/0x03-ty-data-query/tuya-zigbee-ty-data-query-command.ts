import { VOID_ARGUMENTS_ZCL_PAYLOAD_MAPPER, type VoidArguments } from '@thingmate/zigbee';
import {
  TuyaZigbeeCommand,
  type TuyaZigbeeCommandStream,
} from '../../command/tuya-zigbee-command.ts';

/**
 * `TY_DATA_QUERY` (0x03): the gateway queries the device for all its current data
 * points. This command carries no payload; the device answers by reporting its
 * data points.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
export class TuyaZigbeeTyDataQueryCommand extends TuyaZigbeeCommand<VoidArguments> {
  constructor(stream: TuyaZigbeeCommandStream) {
    super(stream, 'client-to-server', 0x03, VOID_ARGUMENTS_ZCL_PAYLOAD_MAPPER);
  }
}
