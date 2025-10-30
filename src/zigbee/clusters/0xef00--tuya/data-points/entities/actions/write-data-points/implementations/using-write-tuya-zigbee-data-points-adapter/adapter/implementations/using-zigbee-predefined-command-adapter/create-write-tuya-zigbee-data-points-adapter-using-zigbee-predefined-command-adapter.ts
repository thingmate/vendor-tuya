import {
  createSendTuyaZigbeeTyDataRequestCommandUsingSendZigbeePredefinedCommand,
  type CreateSendTuyaZigbeeTyDataRequestCommandUsingSendZigbeePredefinedCommandOptions,
} from '../../../../../../../../../commands/0x00--ty-data-request/entities/actions/send/implementations/using-send-zigbee-predefined-command/create-send-tuya-zigbee-ty-data-request-command-using-send-zigbee-predefined-command.js';
import {
  createTuyaZigbeeTyDataResponseCommandObserverUsingZigbeePredefinedCommandObserver,
  type CreateTuyaZigbeeTyDataResponseCommandObserverUsingZigbeePredefinedCommandObserverOptions,
} from '../../../../../../../../../commands/0x01--ty-data-response/entities/events/observer/implementations/using-zigbee-predefined-command-observer/create-tuya-zigbee-ty-data-response-command-observer-using-zigbee-predefined-command-observer.js';
import { type WriteTuyaZigbeeDataPointsAdapter } from '../../write-tuya-zigbee-data-points-adapter.js';

export interface CreateWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions
  extends CreateSendTuyaZigbeeTyDataRequestCommandUsingSendZigbeePredefinedCommandOptions,
    CreateTuyaZigbeeTyDataResponseCommandObserverUsingZigbeePredefinedCommandObserverOptions {}

export function createWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapter(
  options: CreateWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions,
): WriteTuyaZigbeeDataPointsAdapter {
  return {
    send: createSendTuyaZigbeeTyDataRequestCommandUsingSendZigbeePredefinedCommand(options),
    observer:
      createTuyaZigbeeTyDataResponseCommandObserverUsingZigbeePredefinedCommandObserver(options),
  };
}
