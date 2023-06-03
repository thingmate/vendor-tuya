import { createToggleOnOffStateThingActionFromOnOffStateThingProperty, ISmartLightConfig, Thing } from '@thingmate/wot-scripting-api';
import { ITuyaColorThingPropertyOptions, TuyaColorThingProperty } from '../shared/tuya-color-thing-property.class';
import { ITuyaOnOffStateThingPropertyOptions, TuyaOnOffStateThingProperty } from '../shared/tuya-on-off-state-thing-property.class';

export interface ITuyaSmartLightThingOptions extends //
  Omit<ITuyaOnOffStateThingPropertyOptions, 'onOffCommand'>,
  ITuyaColorThingPropertyOptions
//
{
}

export class TuyaSmartLightThing extends Thing<ISmartLightConfig> {
  constructor(
    options: ITuyaSmartLightThingOptions,
  ) {
    const state = new TuyaOnOffStateThingProperty({
      ...options,
      onOffCommand: 'switch_led',
    });

    super({
      properties: {
        state,
        color: new TuyaColorThingProperty(options),
      },
      actions: {
        toggle: createToggleOnOffStateThingActionFromOnOffStateThingProperty(state),
      },
    });
  }
}

