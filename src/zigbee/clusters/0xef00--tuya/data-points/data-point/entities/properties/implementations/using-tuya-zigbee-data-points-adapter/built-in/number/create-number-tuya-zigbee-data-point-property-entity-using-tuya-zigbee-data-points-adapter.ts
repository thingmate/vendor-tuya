import { mapEntityProperty } from '@thingmate/entity';
import { type BidirectionalMapFunctions } from '@xstd/functional';
import { type TuyaZigbeeDataPointPropertyEntity } from '../../../../tuya-zigbee-data-point-property-entity.js';
import {
  createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter,
  type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped,
} from '../../create-tuya-zigbee-data-point-property-entity-using-tuya-zigbee-data-points-adapter.js';

export interface CreateNumberTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions
  extends CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped {
  readonly map?: BidirectionalMapFunctions<number, number>;
}

export function createNumberTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter({
  map,
  ...options
}: CreateNumberTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions): TuyaZigbeeDataPointPropertyEntity<number> {
  const property: TuyaZigbeeDataPointPropertyEntity<number> =
    createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter({
      ...options,
      dataPointType: 2,
    });

  if (map === undefined) {
    return property;
  } else {
    return mapEntityProperty<number, number>(property, map);
  }
}
