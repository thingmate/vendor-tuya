import {
  createSendTuyaZigbeeTyDataQueryCommandActionUsingSendZigbeeCommandForPredefinedPropertiesAction,
  type CreateSendTuyaZigbeeTyDataQueryCommandActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions,
} from '../../../../../../commands/0x03--ty-data-query/interfaces/actions/send/implementations/using-send-zigbee-command-for-predefined-properties-action/create-send-tuya-zigbee-ty-data-query-command-action-using-send-zigbee-command-for-predefined-properties-action.js';
import { type QueryTuyaZigbeeDataPointsAction } from '../../query-tuya-zigbee-data-points.action.js';

export interface CreateQueryTuyaZigbeeDataPointsActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions extends CreateSendTuyaZigbeeTyDataQueryCommandActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions {}

export function createQueryTuyaZigbeeDataPointsActionUsingSendZigbeeCommandForPredefinedPropertiesAction(
  options: CreateQueryTuyaZigbeeDataPointsActionUsingSendZigbeeCommandForPredefinedPropertiesActionOptions,
): QueryTuyaZigbeeDataPointsAction {
  return createSendTuyaZigbeeTyDataQueryCommandActionUsingSendZigbeeCommandForPredefinedPropertiesAction(
    options,
  );
}
