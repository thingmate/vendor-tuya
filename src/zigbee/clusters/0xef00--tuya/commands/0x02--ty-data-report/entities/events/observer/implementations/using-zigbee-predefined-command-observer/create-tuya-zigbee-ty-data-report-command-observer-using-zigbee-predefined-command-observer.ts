import {
  createZigbeeDecodedPayloadObserverUsingZigbeePredefinedCommandObserver,
  type ZigbeePredefinedCommandObserver,
} from '@thingmate/zigbee';
import {
  TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x02_PREDEFINED_PROPERTIES,
  type TuyaZigbeeCluster0xef00Command0x02PredefinedProperties,
} from '../../../../../tuya-zigbee-cluster-0xef00-command-0x02.js';
import { decodeTuyaZigbeeTyDataReportPayload } from '../../../../../types/tuya-zigbee-ty-data-report-payload/codec/decode-tuya-zigbee-ty-data-report-payload.js';

import { type TuyaZigbeeTyDataReportCommandObserver } from '../../tuya-zigbee-ty-data-report-command-observer.js';

export interface CreateTuyaZigbeeTyDataReportCommandObserverUsingZigbeePredefinedCommandObserverOptions {
  readonly observer: ZigbeePredefinedCommandObserver<TuyaZigbeeCluster0xef00Command0x02PredefinedProperties>;
}

export function createTuyaZigbeeTyDataReportCommandObserverUsingZigbeePredefinedCommandObserver({
  observer,
}: CreateTuyaZigbeeTyDataReportCommandObserverUsingZigbeePredefinedCommandObserverOptions): TuyaZigbeeTyDataReportCommandObserver {
  return createZigbeeDecodedPayloadObserverUsingZigbeePredefinedCommandObserver({
    observer,
    commandPredefinedProperties: TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_0x02_PREDEFINED_PROPERTIES,
    decode: decodeTuyaZigbeeTyDataReportPayload,
  });
}
