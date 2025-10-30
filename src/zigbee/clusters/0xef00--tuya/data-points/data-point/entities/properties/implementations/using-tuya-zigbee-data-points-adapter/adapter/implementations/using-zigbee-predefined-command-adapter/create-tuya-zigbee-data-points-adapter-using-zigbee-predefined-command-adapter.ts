import { debounceVoidEntityAction } from '@thingmate/entity';
import {
  createQueryTuyaZigbeeDataPointsUsingSendZigbeePredefinedCommand,
  type CreateQueryTuyaZigbeeDataPointsUsingSendZigbeePredefinedCommandOptions,
} from '../../../../../../../../entities/actions/query-data-points/implementations/using-send-zigbee-predefined-command/create-query-tuya-zigbee-data-points-using-send-zigbee-predefined-command.js';
import {
  createWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapter,
  type CreateWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions,
} from '../../../../../../../../entities/actions/write-data-points/implementations/using-write-tuya-zigbee-data-points-adapter/adapter/implementations/using-zigbee-predefined-command-adapter/create-write-tuya-zigbee-data-points-adapter-using-zigbee-predefined-command-adapter.js';
import { createWriteTuyaZigbeeDataPointsUsingWriteTuyaZigbeeDataPointsAdapter } from '../../../../../../../../entities/actions/write-data-points/implementations/using-write-tuya-zigbee-data-points-adapter/create-write-tuya-zigbee-data-points-using-write-tuya-zigbee-data-points-adapter.js';
import {
  createTuyaZigbeeDataPointsObserverUsingZigbeePredefinedCommandObserver,
  type CreateTuyaZigbeeDataPointsObserverUsingZigbeePredefinedCommandObserverOptions,
} from '../../../../../../../../entities/events/data-points-observer/implementations/using-zigbee-predefined-command-observer/create-tuya-zigbee-data-points-observer-using-zigbee-predefined-command-observer.js';
import { type TuyaZigbeeDataPointsAdapter } from '../../tuya-zigbee-data-points-adapter.js';

export interface CreateTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions
  extends CreateQueryTuyaZigbeeDataPointsUsingSendZigbeePredefinedCommandOptions,
    CreateWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions,
    CreateTuyaZigbeeDataPointsObserverUsingZigbeePredefinedCommandObserverOptions {
  readonly debounce?: number;
}

export function createTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapter({
  debounce = 1000,
  ...options
}: CreateTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapterOptions): TuyaZigbeeDataPointsAdapter {
  return {
    query: debounceVoidEntityAction(
      createQueryTuyaZigbeeDataPointsUsingSendZigbeePredefinedCommand(options),
      debounce,
    ),
    write: createWriteTuyaZigbeeDataPointsUsingWriteTuyaZigbeeDataPointsAdapter(
      createWriteTuyaZigbeeDataPointsAdapterUsingZigbeePredefinedCommandAdapter(options),
    ),
    observer:
      createTuyaZigbeeDataPointsObserverUsingZigbeePredefinedCommandObserver(options).fork(),
  };
}
