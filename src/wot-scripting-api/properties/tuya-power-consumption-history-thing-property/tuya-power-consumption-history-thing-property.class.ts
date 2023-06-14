import { Abortable, AsyncTask } from '@lirx/async-task';
import { IPowerConsumptionHistory, PowerConsumptionHistoryThingProperty } from '@thingmate/wot-scripting-api';

export interface ITuyaPowerConsumptionHistoryThingPropertyOptions {
}

export class TuyaPowerConsumptionHistoryThingProperty extends PowerConsumptionHistoryThingProperty {
  constructor(
    {}: ITuyaPowerConsumptionHistoryThingPropertyOptions,
  ) {
    const read = (
      abortable: Abortable,
    ): AsyncTask<IPowerConsumptionHistory[]> => {
      return AsyncTask.success([], abortable);
    };

    super({
      read,
      minObserveRefreshTime: 10000,
    });
  }
}
