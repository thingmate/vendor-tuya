import { mapEntityProperty } from '@thingmate/entity';
import { numberEnumBidirectionalMapFunctions } from '@xstd/functional';
import { type TuyaZigbeeDataPointPropertyEntity } from '../../../../tuya-zigbee-data-point-property-entity.js';
import {
  createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter,
  type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped,
} from '../../create-tuya-zigbee-data-point-property-entity-using-tuya-zigbee-data-points-adapter.js';

export interface CreateEnumTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions<
  GEnum extends string,
> extends CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped {
  readonly map: Record<GEnum, number>;
}

export function createEnumTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter<
  GEnum extends string,
>({
  map,
  ...options
}: CreateEnumTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions<GEnum>): TuyaZigbeeDataPointPropertyEntity<GEnum> {
  return mapEntityProperty<number, GEnum>(
    createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter({
      ...options,
      dataPointType: 4,
    }),
    numberEnumBidirectionalMapFunctions<GEnum>(map),
  );
}
