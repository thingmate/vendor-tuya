import { TUYA_ZIGBEE_DATA_POINT_TYPE_RAW } from '../../../../../../data-types/0x00--raw/tuya-zigbee-data-point-type-raw.constant.js';
import { type TuyaZigbeeDataPointPropertyEntity } from '../../../../tuya-zigbee-data-point-property-entity.js';
import {
  createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter,
  type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped,
} from '../../create-tuya-zigbee-data-point-property-entity-using-tuya-zigbee-data-points-adapter.js';

export interface CreateRawTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions extends CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped {}

export function createRawTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter(
  options: CreateRawTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions,
): TuyaZigbeeDataPointPropertyEntity<Uint8Array> {
  return createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter<Uint8Array>({
    ...options,
    dataPointType: TUYA_ZIGBEE_DATA_POINT_TYPE_RAW,
  });
}
