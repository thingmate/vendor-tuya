import { Abortable, AsyncTask } from '@lirx/async-task';
import { IPowerConsumption, PowerConsumptionThingProperty } from '@thingmate/wot-scripting-api';

export interface ITuyaPowerConsumptionThingPropertyOptions {
}

export class TuyaPowerConsumptionThingProperty extends PowerConsumptionThingProperty {
  constructor(
    {}: ITuyaPowerConsumptionThingPropertyOptions,
  ) {
    const read = (
      abortable: Abortable,
    ): AsyncTask<IPowerConsumption> => {
      return AsyncTask.success({
        current: 0,
        voltage: 0,
        power: 0,
      }, abortable);
    };

    super({
      read,
      minObserveRefreshTime: 10000,
    });
  }
}
