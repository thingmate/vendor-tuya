import { hsv_to_rgb, IHSVColor, rgb_to_hsv } from '@lifaon/color';
import { math_clamp, math_round } from '@lifaon/math';
import { Abortable, AsyncTask } from '@lirx/async-task';
import { cct_to_cw, ColorThingProperty, cw_to_cct, IRGBCW } from '@thingmate/wot-scripting-api';
import { getDeviceStatusFromMap } from '../../../api/apis/device/get-status/get-device-status-from-map';
import { getTuyaDeviceStatusAsMap } from '../../../api/apis/device/get-status/get-tuya-device-status-as-map';
import { ITuyaDeviceStatusMap } from '../../../api/apis/device/get-status/tuya-device-status-map.type';
import { sendTuyaDeviceCommands } from '../../../api/apis/device/send-commands/send-tuya-device-commands';
import { ITuyaApiContext, ITuyaApiContextFactoryOptions } from '../../../api/helpers/create-tuya-api-context';

export interface ITuyaColorThingPropertyOptions {
  context: ITuyaApiContext;
  deviceId: string;
}

export class TuyaColorThingProperty extends ColorThingProperty {
  constructor(
    {
      context,
      deviceId,
    }: ITuyaColorThingPropertyOptions,
  ) {
    const read = (
      abortable: Abortable,
    ): AsyncTask<IRGBCW> => {
      return context((options: ITuyaApiContextFactoryOptions): AsyncTask<ITuyaDeviceStatusMap> => {
        return getTuyaDeviceStatusAsMap({
          ...options,
          deviceId,
        });
      }, abortable)
        .successful((statusMap: ITuyaDeviceStatusMap): IRGBCW => {
          const work_mode: 'white' | 'colour' = getDeviceStatusFromMap(statusMap, 'work_mode');
          const switch_led: boolean = getDeviceStatusFromMap(statusMap, 'switch_led');

          switch (work_mode) {
            case 'white': {
              const bright_value: number = getDeviceStatusFromMap(statusMap, 'bright_value'); // [0, 255]
              const temp_value: number = getDeviceStatusFromMap(statusMap, 'temp_value'); // [0, 255]
              return {
                r: 0,
                g: 0,
                b: 0,
                ...cct_to_cw({
                  temperature: temp_value / 255,
                  brightness: bright_value / 255,
                }),
              };
            }
            case 'colour': {
              const colour_data: string = getDeviceStatusFromMap(statusMap, 'colour_data');
              const { h, s, v }: IHSVColor = JSON.parse(colour_data); // hsv but with different ranges
              return {
                ...hsv_to_rgb({
                  h: h / 360,
                  s: s / 255,
                  v: v / 255,
                }),
                c: 0,
                w: 0,
              };
            }
            default:
              throw new Error(`Unsupported work_mode: ${work_mode}`);
          }
        });
    };

    const write = (
      value: IRGBCW,
      abortable: Abortable,
    ): AsyncTask<void> => {
      return context((options: ITuyaApiContextFactoryOptions): AsyncTask<any> => {
        let commands: any[];

        if (
          (value.c === 0)
          && (value.w === 0)
        ) { // rgb mode
          if (
            (value.r === 0)
            && (value.g === 0)
            && (value.b === 0)
          ) {
            commands = [
              {
                code: 'switch_led',
                value: false,
              },
            ];
          } else {
            const color: IHSVColor = rgb_to_hsv(value);

            commands = [
              {
                code: 'switch_led',
                value: (color.v > 0),
              },
              {
                code: 'work_mode',
                value: 'colour',
              },
              {
                code: 'colour_data',
                value: {
                  h: math_round(color.h * 360),
                  s: math_round(color.s * 255),
                  v: math_round(color.v * 255),
                },
              },
            ];
          }
        } else { // cct mode
          const { temperature, brightness } = cw_to_cct(value);

          const bright_value: number = math_clamp(math_round(brightness * 255), 25, 255);
          const temp_value: number = math_clamp(math_round(temperature * 255), 0, 255);

          commands = [
            {
              code: 'switch_led',
              value: (brightness > 0),
            },
            {
              code: 'work_mode',
              value: 'white',
            },
            {
              code: 'bright_value',
              value: bright_value,
            },
            {
              code: 'temp_value',
              value: temp_value,
            },
          ];
        }

        return sendTuyaDeviceCommands({
          ...options,
          deviceId,
          commands,
        });
      }, abortable);
    };

    super({
      read,
      write,
      minObserveRefreshTime: 1000 * 10,
    });
  }
}
