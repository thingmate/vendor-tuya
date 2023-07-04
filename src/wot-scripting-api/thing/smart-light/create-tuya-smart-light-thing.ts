import { IHavingThingDescription, ISmartLightThing } from '@thingmate/wot-scripting-api';
import {
  createTuyaColorThingProperty,
  ICreateTuyaColorThingPropertyOptions,
} from '../../thing-property/tuya-color-thing-property/create-tuya-color-thing-property';
import {
  createTuyaOnOffThingProperty,
  ICreateTuyaOnOffThingPropertyOptions,
} from '../../thing-property/tuya-on-off-thing-property/create-tuya-on-off-thing-property';
import {
  createTuyaOnlineThingProperty,
  ICreateTuyaOnlineThingPropertyOptions,
} from '../../thing-property/tuya-online-thing-property/create-tuya-online-thing-property';
import { ITuyaThingDescription } from '../types/tuya-thing-description.type';

export interface ITuyaSmartLightThingOptions extends //
  ICreateTuyaOnlineThingPropertyOptions,
  Omit<ICreateTuyaOnOffThingPropertyOptions, 'onOffCommand'>,
  ICreateTuyaColorThingPropertyOptions,
  IHavingThingDescription<ITuyaThingDescription>
//
{
}

export type ITuyaSmartLightThing = ISmartLightThing<ITuyaThingDescription>;

export function createTuyaSmartLightThing(
  options: ITuyaSmartLightThingOptions,
): ITuyaSmartLightThing {
  return {
    description: options.description,
    properties: {
      online: createTuyaOnlineThingProperty(options),
      onoff: createTuyaOnOffThingProperty({
        ...options,
        onOffCommand: 'switch_led',
      }),
      color: createTuyaColorThingProperty(options),
    },
  };
}

