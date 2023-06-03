import { createToggleOnOffStateThingActionFromOnOffStateThingProperty, ISmartPlugConfig, Thing } from '@thingmate/wot-scripting-api';
import { ITuyaColorThingPropertyOptions } from '../shared/tuya-color-thing-property.class';
import { ITuyaOnOffStateThingPropertyOptions, TuyaOnOffStateThingProperty } from '../shared/tuya-on-off-state-thing-property.class';

export interface ITuyaSmartPlugThingOptions extends //
  Omit<ITuyaOnOffStateThingPropertyOptions, 'onOffCommand'>,
  ITuyaColorThingPropertyOptions
//
{
  chanel?: number,
}

export class TuyaSmartPlugThing extends Thing<ISmartPlugConfig> {
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
      properties: {
        state,
        consumption: null as any,
        consumptionHistory: null as any,
      },
      actions: {
        toggle: createToggleOnOffStateThingActionFromOnOffStateThingProperty(state),
      },
    });
  }
}
