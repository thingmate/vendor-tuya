import {
  createObserveTuyaZigbeeTyDataReportCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow,
  type CreateObserveTuyaZigbeeTyDataReportCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions,
} from '../../../../../../commands/0x02--ty-data-report/interfaces/flows/observe/implementations/using-observe-zigbee-command-for-predefined-properties-flow/create-observe-tuya-zigbee-ty-data-report-command-flow-using-observe-zigbee-command-for-predefined-properties-flow.js';
import { type ObserveTuyaZigbeeDataPointsFlow } from '../../observe-tuya-zigbee-data-points.flow.js';

export interface CreateObserveTuyaZigbeeDataPointsFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions extends CreateObserveTuyaZigbeeTyDataReportCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions {}

export function createObserveTuyaZigbeeDataPointsFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow(
  options: CreateObserveTuyaZigbeeDataPointsFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions,
): ObserveTuyaZigbeeDataPointsFlow {
  return createObserveTuyaZigbeeTyDataReportCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow(
    options,
  );
}
