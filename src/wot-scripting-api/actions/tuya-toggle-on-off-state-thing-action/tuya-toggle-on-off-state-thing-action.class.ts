import {
  createToggleOnOffStateThingActionInitOptionsFromOnOffStateThingProperty,
  IOnOffStateThingProperty,
  ToggleOnOffStateThingAction,
} from '@thingmate/wot-scripting-api';
import {
  ITuyaOnOffStateThingPropertyOptions,
  TuyaOnOffStateThingProperty,
} from '../../properties/tuya-on-off-state-thing-property/tuya-on-off-state-thing-property.class';

export interface ITuyaToggleOnOffStateThingActionOptionsHavingDeviceOptions extends ITuyaOnOffStateThingPropertyOptions {
}

export interface ITuyaToggleOnOffStateThingActionOptionsHavingOnOffStateThingProperty {
  onOffStateProperty: IOnOffStateThingProperty;
}

export type ITuyaToggleOnOffStateThingActionOptions =
  | ITuyaToggleOnOffStateThingActionOptionsHavingDeviceOptions
  | ITuyaToggleOnOffStateThingActionOptionsHavingOnOffStateThingProperty
  ;

export class TuyaToggleOnOffStateThingAction extends ToggleOnOffStateThingAction {
  constructor(
    options: ITuyaToggleOnOffStateThingActionOptions,
  ) {
    super(
      createToggleOnOffStateThingActionInitOptionsFromOnOffStateThingProperty(
        ('onOffStateProperty' in options)
          ? options.onOffStateProperty
          : new TuyaOnOffStateThingProperty(options),
      ),
    );
  }
}
