import { numberEnumEntityPropertyMapper } from '@thingmate/entity';
import { TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM } from '../../../../../../data-types/0x04--enum/tuya-zigbee-data-point-type-enum.constant.js';
import { type TuyaZigbeeDataPointPropertyEntity } from '../../../../tuya-zigbee-data-point-property-entity.js';
import {
  createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter,
  type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped,
} from '../../create-tuya-zigbee-data-point-property-entity-using-tuya-zigbee-data-points-adapter.js';

export interface CreateEnumTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions<
  GEnum extends string,
> extends CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped {
  readonly record: Record<GEnum, number>;
}

export function createEnumTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter<
  GEnum extends string,
>({
  record,
  ...options
}: CreateEnumTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions<GEnum>): TuyaZigbeeDataPointPropertyEntity<GEnum> {
  return createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter<number>({
    ...options,
    dataPointType: TUYA_ZIGBEE_DATA_POINT_TYPE_ENUM,
  }).map(numberEnumEntityPropertyMapper<GEnum>(record));
}
