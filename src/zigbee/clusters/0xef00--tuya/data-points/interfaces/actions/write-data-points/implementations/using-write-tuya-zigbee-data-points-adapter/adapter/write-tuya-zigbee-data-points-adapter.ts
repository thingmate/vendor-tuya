import { type SendTuyaZigbeeTyDataRequestCommandAction } from '../../../../../../../commands/0x00--ty-data-request/interfaces/actions/send/send-tuya-zigbee-ty-data-request-command.action.js';
import { type ObserveTuyaZigbeeTyDataResponseCommandFlow } from '../../../../../../../commands/0x01--ty-data-response/interfaces/flows/observe/observe-tuya-zigbee-ty-data-response-command.flow.js';

export interface WriteTuyaZigbeeDataPointsAdapter {
  readonly send: SendTuyaZigbeeTyDataRequestCommandAction;
  readonly observe: ObserveTuyaZigbeeTyDataResponseCommandFlow;
}
