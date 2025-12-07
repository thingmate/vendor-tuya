import {
  createQueryTuyaZigbeeDataPointsActionUsingSendZigbeeCommandForPredefinedPropertiesAction,
  type CreateQueryTuyaZigbeeDataPointsActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions,
} from '../../../../../../../../interfaces/actions/query-data-points/implementations/using-send-zigbee-command-for-predefined-properties-action/create-query-tuya-zigbee-data-points-action-using-send-zigbee-command-for-predefined-properties-action.js';
import {
  createWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapter,
  type CreateWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions,
} from '../../../../../../../../interfaces/actions/write-data-points/implementations/using-write-tuya-zigbee-data-points-adapter/adapter/implementations/using-zigbee-predefined-command-adapter/create-write-tuya-zigbee-data-points-adapter-using-zigbee-predefined-command-adapter.js';
import { createWriteTuyaZigbeeDataPointsActionUsingWriteTuyaZigbeeDataPointsAdapter } from '../../../../../../../../interfaces/actions/write-data-points/implementations/using-write-tuya-zigbee-data-points-adapter/create-write-tuya-zigbee-data-points-action-using-write-tuya-zigbee-data-points-adapter.js';
import {
  createObserveTuyaZigbeeDataPointsFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow,
  type CreateObserveTuyaZigbeeDataPointsFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions,
} from '../../../../../../../../interfaces/flows/observe-data-points/implementations/using-observe-zigbee-command-for-predefined-properties-flow/create-observe-tuya-zigbee-data-points-flow-using-observe-zigbee-command-for-predefined-properties-flow.js';
import { type TuyaZigbeeDataPointsAdapter } from '../../tuya-zigbee-data-points-adapter.js';

export interface CreateTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions
  extends
    CreateQueryTuyaZigbeeDataPointsActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions,
    CreateWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions,
    CreateObserveTuyaZigbeeDataPointsFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions {}

export function createTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapter({
  ...options
}: CreateTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions): TuyaZigbeeDataPointsAdapter {
  return {
    query: createQueryTuyaZigbeeDataPointsActionUsingSendZigbeeCommandForPredefinedPropertiesAction(
      options,
    ).shareConcurentCalls({ keyGenerator: () => '' }),
    write: createWriteTuyaZigbeeDataPointsActionUsingWriteTuyaZigbeeDataPointsAdapter(
      createWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapter(options),
    ),
    observe:
      createObserveTuyaZigbeeDataPointsFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow(
        options,
      ).fork(),
  };
}
