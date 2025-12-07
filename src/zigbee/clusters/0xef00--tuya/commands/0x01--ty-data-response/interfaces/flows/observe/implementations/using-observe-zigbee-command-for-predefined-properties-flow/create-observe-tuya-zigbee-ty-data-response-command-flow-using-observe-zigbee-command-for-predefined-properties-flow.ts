import {
  createObserveZigbeeDecodedPayloadFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow,
  type ObserveZigbeeCommandForPredefinedPropertiesFlow,
} from '@thingmate/zigbee';
import { decodeTuyaZigbeeTyDataResponsePayload } from '../../../../../members/tuya-zigbee-ty-data-response-payload/codec/decode-tuya-zigbee-ty-data-response-payload.js';
import {
  TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x01_PREDEFINED_PROPERTIES,
  type TuyaZigbeeCluster0xef00Command0x01PredefinedProperties,
} from '../../../../../tuya-zigbee-cluster-0xef00-command-0x01.js';

import { type ObserveTuyaZigbeeTyDataResponseCommandFlow } from '../../observe-tuya-zigbee-ty-data-response-command.flow.js';

export interface CreateObserveTuyaZigbeeTyDataResponseCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions {
  readonly observe: ObserveZigbeeCommandForPredefinedPropertiesFlow<TuyaZigbeeCluster0xef00Command0x01PredefinedProperties>;
}

export function createObserveTuyaZigbeeTyDataResponseCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow({
  observe,
}: CreateObserveTuyaZigbeeTyDataResponseCommandFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlowOptions): ObserveTuyaZigbeeTyDataResponseCommandFlow {
  return createObserveZigbeeDecodedPayloadFlowUsingObserveZigbeeCommandForPredefinedPropertiesFlow({
    observe,
    commandPredefinedProperties: TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x01_PREDEFINED_PROPERTIES,
    decode: decodeTuyaZigbeeTyDataResponsePayload,
  });
}
