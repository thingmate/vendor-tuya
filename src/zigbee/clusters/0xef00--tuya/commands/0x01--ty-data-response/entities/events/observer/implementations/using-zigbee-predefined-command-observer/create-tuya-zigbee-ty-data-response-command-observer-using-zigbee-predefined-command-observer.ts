import {
  createZigbeeDecodedPayloadObserverUsingZigbeePredefinedCommandObserver,
  type ZigbeePredefinedCommandObserver,
} from '@thingmate/zigbee';
import {
  TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x01_PREDEFINED_PROPERTIES,
  type TuyaZigbeeCluster0xef00Command0x01PredefinedProperties,
} from '../../../../../tuya-zigbee-cluster-0xef00-command-0x01.js';
import { decodeTuyaZigbeeTyDataResponsePayload } from '../../../../../types/tuya-zigbee-ty-data-response-payload/codec/decode-tuya-zigbee-ty-data-response-payload.js';

import { type TuyaZigbeeTyDataResponseCommandObserver } from '../../tuya-zigbee-ty-data-response-command-observer.js';

export interface CreateTuyaZigbeeTyDataResponseCommandObserverUsingZigbeePredefinedCommandObserverOptions {
  readonly observer: ZigbeePredefinedCommandObserver<TuyaZigbeeCluster0xef00Command0x01PredefinedProperties>;
}

export function createTuyaZigbeeTyDataResponseCommandObserverUsingZigbeePredefinedCommandObserver({
  observer,
}: CreateTuyaZigbeeTyDataResponseCommandObserverUsingZigbeePredefinedCommandObserverOptions): TuyaZigbeeTyDataResponseCommandObserver {
  return createZigbeeDecodedPayloadObserverUsingZigbeePredefinedCommandObserver({
    observer,
    commandPredefinedProperties: TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x01_PREDEFINED_PROPERTIES,
    decode: decodeTuyaZigbeeTyDataResponsePayload,
  });
}
