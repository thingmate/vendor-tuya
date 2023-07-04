import { Abortable, AsyncTask } from '@lirx/async-task';
import { IPowerConsumptionHistory, IPowerConsumptionHistoryThingProperty } from '@thingmate/wot-scripting-api';

export interface ICreateTuyaPowerConsumptionHistoryThingPropertyOptions {
}

export function createTuyaConsumptionHistoryThingProperty(
  {}: ICreateTuyaPowerConsumptionHistoryThingPropertyOptions,
): IPowerConsumptionHistoryThingProperty {
  const read = (
    abortable: Abortable,
  ): AsyncTask<IPowerConsumptionHistory[]> => {
    return AsyncTask.success([], abortable);
  };

  return {
    read,
  };
}
