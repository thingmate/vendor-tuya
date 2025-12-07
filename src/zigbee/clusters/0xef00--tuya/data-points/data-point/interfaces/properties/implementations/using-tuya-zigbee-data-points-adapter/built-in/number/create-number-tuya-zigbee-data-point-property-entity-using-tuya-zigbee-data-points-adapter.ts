import { TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32 } from '../../../../../../data-types/0x02--uint32/tuya-zigbee-data-point-type-uint32.constant.js';
import { type TuyaZigbeeDataPointPropertyEntity } from '../../../../tuya-zigbee-data-point-property-entity.js';
import {
  createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter,
  type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped,
} from '../../create-tuya-zigbee-data-point-property-entity-using-tuya-zigbee-data-points-adapter.js';

export interface CreateNumberTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions extends CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped {}

export function createNumberTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter(
  options: CreateNumberTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions,
): TuyaZigbeeDataPointPropertyEntity<number> {
  return createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter<number>({
    ...options,
    dataPointType: TUYA_ZIGBEE_DATA_POINT_TYPE_UINT32,
  });
}
