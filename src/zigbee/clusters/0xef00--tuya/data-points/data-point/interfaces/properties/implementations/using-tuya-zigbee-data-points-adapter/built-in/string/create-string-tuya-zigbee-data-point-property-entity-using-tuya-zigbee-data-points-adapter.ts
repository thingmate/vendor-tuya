import { TUYA_ZIGBEE_DATA_POINT_TYPE_STRING } from '../../../../../../data-types/0x03--string/tuya-zigbee-data-point-type-string.constant.js';
import { type TuyaZigbeeDataPointPropertyEntity } from '../../../../tuya-zigbee-data-point-property-entity.js';
import {
  createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter,
  type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped,
} from '../../create-tuya-zigbee-data-point-property-entity-using-tuya-zigbee-data-points-adapter.js';

export interface CreateStringTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions extends CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped {}

export function createStringTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter(
  options: CreateStringTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions,
): TuyaZigbeeDataPointPropertyEntity<string> {
  return createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter<string>({
    ...options,
    dataPointType: TUYA_ZIGBEE_DATA_POINT_TYPE_STRING,
  });
}
