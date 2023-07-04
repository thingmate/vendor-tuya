import { IHavingThingDescription, ISmartPlugThing } from '@thingmate/wot-scripting-api';

import { ICreateTuyaColorThingPropertyOptions } from '../../thing-property/tuya-color-thing-property/create-tuya-color-thing-property';
import {
  createTuyaOnOffThingProperty,
  ICreateTuyaOnOffThingPropertyOptions,
} from '../../thing-property/tuya-on-off-thing-property/create-tuya-on-off-thing-property';
import {
  createTuyaOnlineThingProperty,
  ICreateTuyaOnlineThingPropertyOptions,
} from '../../thing-property/tuya-online-thing-property/create-tuya-online-thing-property';
import {
  createTuyaConsumptionHistoryThingProperty,
} from '../../thing-property/tuya-power-consumption-history-thing-property/create-tuya-power-consumption-history-thing-property';
import {
  createTuyaConsumptionThingProperty,
} from '../../thing-property/tuya-power-consumption-thing-property/create-tuya-power-consumption-thing-property';
import { ITuyaThingDescription } from '../types/tuya-thing-description.type';

export interface ICreateTuyaSmartPlugThingOptions extends //
  ICreateTuyaOnlineThingPropertyOptions,
  Omit<ICreateTuyaOnOffThingPropertyOptions, 'onOffCommand'>,
  ICreateTuyaColorThingPropertyOptions,
  IHavingThingDescription<ITuyaThingDescription>
//
{
  chanel?: number,
}

export type ITuyaSmartPlugThing = ISmartPlugThing<ITuyaThingDescription>;

export function createTuyaSmartPlugThing(
  {
    chanel = 0,
    ...options
  }: ICreateTuyaSmartPlugThingOptions,
): ITuyaSmartPlugThing {
  return {
    description: options.description,
    properties: {
      online: createTuyaOnlineThingProperty(options),
      onoff: createTuyaOnOffThingProperty({
        ...options,
        onOffCommand: `switch_${chanel + 1}`,
      }),
      consumption: createTuyaConsumptionThingProperty({}),
      consumptionHistory: createTuyaConsumptionHistoryThingProperty({}),
    },
  };
}

