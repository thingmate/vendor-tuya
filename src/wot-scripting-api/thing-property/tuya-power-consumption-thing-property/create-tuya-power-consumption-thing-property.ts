import { Abortable, AsyncTask } from '@lirx/async-task';
import { IPowerConsumption, IPowerConsumptionThingProperty } from '@thingmate/wot-scripting-api';

export interface ICreateTuyaPowerConsumptionThingPropertyOptions {
}

export function createTuyaConsumptionThingProperty(
  {}: ICreateTuyaPowerConsumptionThingPropertyOptions,
): IPowerConsumptionThingProperty {
  const read = (
    abortable: Abortable,
  ): AsyncTask<IPowerConsumption> => {
    return AsyncTask.success({
      current: 0,
      voltage: 0,
      power: 0,
    }, abortable);
  };

  return {
    read,
  };
}

