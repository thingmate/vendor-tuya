import {
  createToggleOnOffStateThingActionFromOnOffStateThingProperty,
  ISmartLightConfig,
  IThingInitDescriptionOptions, SmartLightThing,
  Thing,
} from '@thingmate/wot-scripting-api';
import {
  TuyaToggleOnOffStateThingAction,
} from '../../actions/tuya-toggle-on-off-state-thing-action/tuya-toggle-on-off-state-thing-action.class';
import {
  ITuyaColorThingPropertyOptions,
  TuyaColorThingProperty,
} from '../../properties/tuya-color-thing-property/tuya-color-thing-property.class';
import {
  ITuyaOnOffStateThingPropertyOptions,
  TuyaOnOffStateThingProperty,
} from '../../properties/tuya-on-off-state-thing-property/tuya-on-off-state-thing-property.class';
import {
  ITuyaOnlineThingPropertyOptions,
  TuyaOnlineThingProperty,
} from '../../properties/tuya-online-thing-property/tuya-online-thing-property.class';

export interface ITuyaSmartLightThingOptions extends //
  ITuyaOnlineThingPropertyOptions,
  Omit<ITuyaOnOffStateThingPropertyOptions, 'onOffCommand'>,
  ITuyaColorThingPropertyOptions,
  IThingInitDescriptionOptions
//
{
}

export class TuyaSmartLightThing extends SmartLightThing {
  constructor(
    options: ITuyaSmartLightThingOptions,
  ) {
    const state = new TuyaOnOffStateThingProperty({
      ...options,
      onOffCommand: 'switch_led',
    });

    super({
      description: options.description,
      properties: {
        online: new TuyaOnlineThingProperty(options),
        state,
        color: new TuyaColorThingProperty(options),
      },
      actions: {
        toggle: new TuyaToggleOnOffStateThingAction({
          onOffStateProperty: state,
        }),
      },
    });
  }
}

