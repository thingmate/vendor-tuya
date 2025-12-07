import {
  createSendTuyaZigbeeTyDataRequestCommandActionUsingSendZigbeeCommandForPredefinedPropertiesAction,
  type CreateSendTuyaZigbeeTyDataRequestCommandActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions,
} from '../../../../../../../../../commands/0x00--ty-data-request/interfaces/actions/send/implementations/using-send-zigbee-command-for-predefined-properties-action/create-send-tuya-zigbee-ty-data-request-command-action-using-send-zigbee-command-for-predefined-properties-action.js';
import {
  createObserveTuyaZigbeeTyDataResponseCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow,
  type CreateObserveTuyaZigbeeTyDataResponseCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions,
} from '../../../../../../../../../commands/0x01--ty-data-response/interfaces/flows/observe/implementations/using-observe-zigbee-command-for-predefined-properties-flow/create-observe-tuya-zigbee-ty-data-response-command-flow-using-observe-zigbee-command-for-predefined-properties-flow.js';
import { type WriteTuyaZigbeeDataPointsAdapter } from '../../write-tuya-zigbee-data-points-adapter.js';

export interface CreateWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions
  extends
    CreateSendTuyaZigbeeTyDataRequestCommandActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions,
    CreateObserveTuyaZigbeeTyDataResponseCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions {}

export function createWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapter(
  options: CreateWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions,
): WriteTuyaZigbeeDataPointsAdapter {
  return {
    send: createSendTuyaZigbeeTyDataRequestCommandActionUsingSendZigbeeCommandForPredefinedPropertiesAction(
      options,
    ),
    observe:
      createObserveTuyaZigbeeTyDataResponseCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow(
        options,
      ),
  };
}
