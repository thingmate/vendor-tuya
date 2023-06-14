import { IThingInitDescriptionOptions, SmartPlugThing } from '@thingmate/wot-scripting-api';
import {
  TuyaToggleOnOffStateThingAction,
} from '../../actions/tuya-toggle-on-off-state-thing-action/tuya-toggle-on-off-state-thing-action.class';
import { ITuyaColorThingPropertyOptions } from '../../properties/tuya-color-thing-property/tuya-color-thing-property.class';
import {
  ITuyaOnOffStateThingPropertyOptions,
  TuyaOnOffStateThingProperty,
} from '../../properties/tuya-on-off-state-thing-property/tuya-on-off-state-thing-property.class';
import {
  ITuyaOnlineThingPropertyOptions,
  TuyaOnlineThingProperty,
} from '../../properties/tuya-online-thing-property/tuya-online-thing-property.class';
import {
  TuyaPowerConsumptionHistoryThingProperty
} from '../../properties/tuya-power-consumption-history-thing-property/tuya-power-consumption-history-thing-property.class';
import {
  TuyaPowerConsumptionThingProperty
} from '../../properties/tuya-power-consumption-thing-property/tuya-power-consumption-thing-property.class';

export interface ITuyaSmartPlugThingOptions extends //
  ITuyaOnlineThingPropertyOptions,
  Omit<ITuyaOnOffStateThingPropertyOptions, 'onOffCommand'>,
  ITuyaColorThingPropertyOptions,
  IThingInitDescriptionOptions
//
{
  chanel?: number,
}

export class TuyaSmartPlugThing extends SmartPlugThing {
  constructor(
    {
      chanel = 0,
      ...options
    }: ITuyaSmartPlugThingOptions,
  ) {
    const state = new TuyaOnOffStateThingProperty({
      ...options,
      onOffCommand: `switch_${chanel + 1}`,
    });

    super({
      description: options.description,
      properties: {
        online: new TuyaOnlineThingProperty(options),
        state,
        consumption: new TuyaPowerConsumptionThingProperty({}),
        consumptionHistory: new TuyaPowerConsumptionHistoryThingProperty({}),
      },
      actions: {
        toggle: new TuyaToggleOnOffStateThingAction({
          onOffStateProperty: state,
        }),
      },
    });
  }
}
