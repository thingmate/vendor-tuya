import { type SendTuyaZigbeeTyDataRequestCommand } from '../../../../../../../commands/0x00--ty-data-request/entities/actions/send/send-tuya-zigbee-ty-data-request-command.js';
import { type TuyaZigbeeTyDataResponseCommandObserver } from '../../../../../../../commands/0x01--ty-data-response/entities/events/observer/tuya-zigbee-ty-data-response-command-observer.js';

export interface WriteTuyaZigbeeDataPointsAdapter {
  readonly send: SendTuyaZigbeeTyDataRequestCommand;
  readonly observer: TuyaZigbeeTyDataResponseCommandObserver;
}
