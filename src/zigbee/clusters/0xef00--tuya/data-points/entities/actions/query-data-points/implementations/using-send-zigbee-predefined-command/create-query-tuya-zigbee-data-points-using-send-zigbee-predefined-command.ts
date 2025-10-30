import {
  createSendTuyaZigbeeTyDataQueryCommandUsingSendZigbeePredefinedCommand,
  type CreateSendTuyaZigbeeTyDataQueryCommandUsingSendZigbeePredefinedCommandOptions,
} from '../../../../../../commands/0x03--ty-data-query/entities/actions/send/implementations/using-send-zigbee-predefined-command/create-send-tuya-zigbee-ty-data-request-command-using-send-zigbee-predefined-command.js';
import { type QueryTuyaZigbeeDataPoints } from '../../query-tuya-zigbee-data-points.js';

export interface CreateQueryTuyaZigbeeDataPointsUsingSendZigbeePredefinedCommandOptions
  extends CreateSendTuyaZigbeeTyDataQueryCommandUsingSendZigbeePredefinedCommandOptions {}

export function createQueryTuyaZigbeeDataPointsUsingSendZigbeePredefinedCommand(
  options: CreateQueryTuyaZigbeeDataPointsUsingSendZigbeePredefinedCommandOptions,
): QueryTuyaZigbeeDataPoints {
  return createSendTuyaZigbeeTyDataQueryCommandUsingSendZigbeePredefinedCommand(options);
}
