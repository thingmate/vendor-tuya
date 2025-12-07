import {
  createObserveZigbeeDecodedPayloadFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow,
  type ObserveZigbeeCommandForPredefinedPropertiesFlow,
} from '@thingmate/zigbee';
import { decodeTuyaZigbeeTyDataReportPayload } from '../../../../../members/tuya-zigbee-ty-data-report-payload/codec/decode-tuya-zigbee-ty-data-report-payload.js';
import {
  TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x02_PREDEFINED_PROPERTIES,
  type TuyaZigbeeCluster0xef00Command0x02PredefinedProperties,
} from '../../../../../tuya-zigbee-cluster-0xef00-command-0x02.js';

import { type ObserveTuyaZigbeeTyDataReportCommandFlow } from '../../observe-tuya-zigbee-ty-data-report-command.flow.js';

export interface CreateObserveTuyaZigbeeTyDataReportCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions {
  readonly observe: ObserveZigbeeCommandForPredefinedPropertiesFlow<TuyaZigbeeCluster0xef00Command0x02PredefinedProperties>;
}

export function createObserveTuyaZigbeeTyDataReportCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow({
  observe,
}: CreateObserveTuyaZigbeeTyDataReportCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions): ObserveTuyaZigbeeTyDataReportCommandFlow {
  return createObserveZigbeeDecodedPayloadFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow({
    observe,
    commandPredefinedProperties: TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x02_PREDEFINED_PROPERTIES,
    decode: decodeTuyaZigbeeTyDataReportPayload,
  });
}
