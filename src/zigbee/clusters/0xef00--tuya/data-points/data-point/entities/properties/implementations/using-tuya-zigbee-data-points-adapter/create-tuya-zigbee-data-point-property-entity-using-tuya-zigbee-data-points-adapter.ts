import { DEFAULT_ENTITY_PROPERTY } from '@thingmate/entity';
import { type TuyaZigbeeSequenceLike } from '../../../../../../sequence/generator/implementations/tuya-zigbee-sequence-like.js';
import { type TuyaZigbeeDataPointType } from '../../../../data-types/tuya-zigbee-data-point-type.js';
import { createReadTuyaZigbeeDataPointUsingQueryTuyaZigbeeDataPointsAndObserver } from '../../../actions/read-data-point/implementations/using-query-tuya-zigbee-data-points-and-observer/create-read-tuya-zigbee-data-point-using-query-tuya-zigbee-data-points-and-observer.js';
import { type ReadTuyaZigbeeDataPoint } from '../../../actions/read-data-point/read-tuya-zigbee-data-point.js';
import { createWriteTuyaZigbeeDataPointUsingWriteTuyaZigbeeDataPoints } from '../../../actions/write-data-point/implementations/using-write-tuya-zigbee-data-points/create-write-tuya-zigbee-data-point-using-write-tuya-zigbee-data-points.js';
import { type WriteTuyaZigbeeDataPoint } from '../../../actions/write-data-point/write-tuya-zigbee-data-point.js';
import { createTuyaZigbeeDataPointObserverUsingTuyaZigbeeDataPointsObserver } from '../../../events/data-point-observer/implementations/using-tuya-zigbee-data-points-observer/create-tuya-zigbee-data-point-observer-using-tuya-zigbee-data-points-observer.js';
import { type TuyaZigbeeDataPointObserver } from '../../../events/data-point-observer/tuya-zigbee-data-point-observer.js';
import { type TuyaZigbeeDataPointPropertyEntity } from '../../tuya-zigbee-data-point-property-entity.js';
import { type TuyaZigbeeDataPointsAdapter } from './adapter/tuya-zigbee-data-points-adapter.js';

export interface CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions {
  readonly adapter: TuyaZigbeeDataPointsAdapter;

  // mode
  readonly readable?: boolean;
  readonly writable?: boolean;
  readonly observable?: boolean;

  // dataPoint
  readonly dataPointId: number /* u8 */;
  readonly dataPointType: TuyaZigbeeDataPointType; // u8;
  readonly seq?: TuyaZigbeeSequenceLike | undefined;
}

export function createTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapter<GValue>({
  adapter,
  // mode
  readable = false,
  writable = false,
  observable = false,
  // dataPoint
  dataPointId,
  dataPointType,
  seq,
}: CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions): TuyaZigbeeDataPointPropertyEntity<GValue> {
  const writeTuyaZigbeeDataPoint: WriteTuyaZigbeeDataPoint<GValue> =
    createWriteTuyaZigbeeDataPointUsingWriteTuyaZigbeeDataPoints<GValue>({
      write: adapter.write,
      dataPointId,
      dataPointType,
      seq,
    });

  const tuyaZigbeeDataPointObserver: TuyaZigbeeDataPointObserver<GValue> =
    createTuyaZigbeeDataPointObserverUsingTuyaZigbeeDataPointsObserver<GValue>({
      observer: adapter.observer,
      dataPointId,
    }).fork();

  const readTuyaZigbeeDataPoint: ReadTuyaZigbeeDataPoint<GValue> =
    createReadTuyaZigbeeDataPointUsingQueryTuyaZigbeeDataPointsAndObserver<GValue>({
      query: adapter.query,
      observer: tuyaZigbeeDataPointObserver,
    });

  return {
    get: readable ? readTuyaZigbeeDataPoint : DEFAULT_ENTITY_PROPERTY.get,
    set: writable ? writeTuyaZigbeeDataPoint : DEFAULT_ENTITY_PROPERTY.set,
    observer: observable ? tuyaZigbeeDataPointObserver : DEFAULT_ENTITY_PROPERTY.observer,
  };
}

/*---*/

export type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped =
  Omit<
    CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions,
    'dataPointType'
  >;
