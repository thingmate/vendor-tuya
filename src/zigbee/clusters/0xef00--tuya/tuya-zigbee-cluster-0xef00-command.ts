import { ZIGBEE_CLUSTER_SPECIFIC_COMMAND_PREDEFINED_PROPERTIES } from '@thingmate/zigbee';
import { TUYA_ZIGBEE_CLUSTER_0xef00 } from './tuya-zigbee-cluster-0xef00.js';

export const TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_PREDEFINED_PROPERTIES = Object.freeze({
  ...ZIGBEE_CLUSTER_SPECIFIC_COMMAND_PREDEFINED_PROPERTIES,
  cluster: TUYA_ZIGBEE_CLUSTER_0xef00,
});

export type TuyaZigbeeCluster0xef00CommandPredefinedProperties =
  typeof TUYA_ZIGBEE_CLUSTER_0xef00_COMMAND_PREDEFINED_PROPERTIES;
