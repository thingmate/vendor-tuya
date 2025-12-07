import {
  EntityProperty,
  type ObserveEntityPropertyFlow,
  type ReadEntityPropertyAction,
  type WriteEntityPropertyAction,
} from '@thingmate/entity';
import { type TuyaZigbeeSequenceLike } from '../../../../../../sequence/generator/implementations/tuya-zigbee-sequence-like.js';
import { type TuyaZigbeeDataPointType } from '../../../../data-types/tuya-zigbee-data-point-type.js';
import { createReadTuyaZigbeeDataPointActionUsingQueryAndObserveTuyaZigbeeDataPoints } from '../../../actions/read-data-point/implementations/using-query-and-observe-tuya-zigbee-data-points/create-read-tuya-zigbee-data-point-action-using-query-and-observe-tuya-zigbee-data-points.js';
import { createWriteTuyaZigbeeDataPointActionUsingWriteTuyaZigbeeDataPointsAction } from '../../../actions/write-data-point/implementations/using-write-tuya-zigbee-data-points-action/create-write-tuya-zigbee-data-point-action-using-write-tuya-zigbee-data-points-action.js';
import { createObserveTuyaZigbeeDataPointFlowUsingObserveTuyaZigbeeDataPointsFlow } from '../../../flows/observe-data-point/implementations/using-observe-tuya-zigbee-data-points-flow/create-observe-tuya-zigbee-data-point-flow-using-observe-tuya-zigbee-data-points-flow.js';
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
  let read: ReadEntityPropertyAction<GValue> | undefined;
  let write: WriteEntityPropertyAction<GValue> | undefined;
  let observe: ObserveEntityPropertyFlow<GValue> | undefined;

  if (readable || observable) {
    observe = createObserveTuyaZigbeeDataPointFlowUsingObserveTuyaZigbeeDataPointsFlow<GValue>({
      observe: adapter.observe,
      dataPointId,
    });

    if (readable && observable) {
      observe = observe.fork();
    }

    if (readable) {
      read = createReadTuyaZigbeeDataPointActionUsingQueryAndObserveTuyaZigbeeDataPoints<GValue>({
        query: adapter.query,
        observe,
      });
    }
  }

  if (writable) {
    write = createWriteTuyaZigbeeDataPointActionUsingWriteTuyaZigbeeDataPointsAction<GValue>({
      write: adapter.write,
      dataPointId,
      dataPointType,
      seq,
    });
  }

  return new EntityProperty<GValue>({
    read,
    write,
    observe,
  });
}

/*---*/

export type CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptionsForTyped =
  Omit<
    CreateTuyaZigbeeDataPointPropertyEntityUsingTuyaZigbeeDataPointsAdapterOptions,
    'dataPointType'
  >;
