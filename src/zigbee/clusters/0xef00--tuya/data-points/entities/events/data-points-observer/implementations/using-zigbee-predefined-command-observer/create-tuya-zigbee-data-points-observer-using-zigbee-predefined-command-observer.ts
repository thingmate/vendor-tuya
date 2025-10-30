import {
  createTuyaZigbeeTyDataReportCommandObserverUsingZigbeePredefinedCommandObserver,
  type CreateTuyaZigbeeTyDataReportCommandObserverUsingZigbeePredefinedCommandObserverOptions,
} from '../../../../../../commands/0x02--ty-data-report/entities/events/observer/implementations/using-zigbee-predefined-command-observer/create-tuya-zigbee-ty-data-report-command-observer-using-zigbee-predefined-command-observer.js';
import { type TuyaZigbeeDataPointsObserver } from '../../tuya-zigbee-data-points-observer.js';

export interface CreateTuyaZigbeeDataPointsObserverUsingZigbeePredefinedCommandObserverOptions
  extends CreateTuyaZigbeeTyDataReportCommandObserverUsingZigbeePredefinedCommandObserverOptions {}

export function createTuyaZigbeeDataPointsObserverUsingZigbeePredefinedCommandObserver(
  options: CreateTuyaZigbeeDataPointsObserverUsingZigbeePredefinedCommandObserverOptions,
): TuyaZigbeeDataPointsObserver {
  return createTuyaZigbeeTyDataReportCommandObserverUsingZigbeePredefinedCommandObserver(options);
}
