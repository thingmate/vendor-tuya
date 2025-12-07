import { TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN } from '../../../../../../data-types/0x01--boolean/tuya-zigbee-data-point-type-boolean.constant.js';
import { type TuyaZigbeeDataPointPropertyEntity } from '../../../../tuya-zigbee-data-point-property-entity.js';
import {
  createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter,
  type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped,
} from '../../create-tuya-zigbee-data-point-property-entity-using-tuya-zigbee-data-points-adapter.js';

export interface CreateBooleanTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions extends CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped {}

export function createBooleanTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter(
  options: CreateBooleanTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions,
): TuyaZigbeeDataPointPropertyEntity<boolean> {
  return createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter<boolean>({
    ...options,
    dataPointType: TUYA_ZIGBEE_DATA_POINT_TYPE_BOOLEAN,
  });
}
