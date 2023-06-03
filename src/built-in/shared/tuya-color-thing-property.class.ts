import { hsv_to_rgb, IHSVColor, rgb_to_hsv } from '@lifaon/color';
import { math_round } from '@lifaon/math';
import { Abortable, AsyncTask } from '@lirx/async-task';
import { IColorThingProperty, ThingProperty } from '@thingmate/wot-scripting-api';
import { IRGBCW } from '@thingmate/wot-scripting-api/src/devices/shared/color/rgb-cw.type';
import { getDeviceStatusFromMap } from '../../api/apis/device/get-status/get-device-status-from-map';
import { getTuyaDeviceStatusAsMap } from '../../api/apis/device/get-status/get-tuya-device-status-as-map';
import { ITuyaDeviceStatusMap } from '../../api/apis/device/get-status/tuya-device-status-map.type';
import { sendTuyaDeviceCommands } from '../../api/apis/device/send-commands/send-tuya-device-commands';
import { ITuyaApiContext, ITuyaApiContextFactoryOptions } from '../../create-tuya-api-context';

export type ICCTRange = [
  min: number,
  max: number,
];

export interface ITuyaColorThingPropertyOptions {
  context: ITuyaApiContext;
  deviceId: string;
  cctRange?: ICCTRange;
}

export class TuyaColorThingProperty extends ThingProperty<IRGBCW> {
  constructor(
    {
      context,
      deviceId,
      cctRange = [2700, 6500],
    }: ITuyaColorThingPropertyOptions,
  ) {
    const [cct_min, cct_max] = cctRange;

    // const temp_value_to_normalized_temperature = (
    //   temp_value: number, // [0, 255]
    // ): number => {
    //   return math_lerp(temp_value / 255, cct_min, cct_max);
    // };
    //
    // const normalized_temperature_to_temp_value = (
    //   temperature: number, // in K
    // ): number => {
    //   return math_round(math_inv_lerp(math_clamp(temperature, cct_min, cct_max), cct_min, cct_max) * 255);
    // };

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
            // case 'white': {
            //   const bright_value: number = getDeviceStatusFromMap(statusMap, 'bright_value'); // [0, 255]
            //   const temp_value: number = getDeviceStatusFromMap(statusMap, 'temp_value'); // [0, 255]
            //
            //   return {
            //     mode: 'cct',
            //     brightness: (bright_value / 255),
            //     temperature: temp_value_to_normalized_temperature(temp_value),
            //   };
            // }
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
        } else { // cct mode
          throw 'TODO cct';
          // const bright_value: number = math_clamp(math_round(value.brightness * 255), 25, 255);
          // const temp_value: number = normalized_temperature_to_temp_value(value.temperature);
          //
          // commands = [
          //   {
          //     code: 'switch_led',
          //     value: (value.brightness > 0),
          //   },
          //   {
          //     code: 'work_mode',
          //     value: 'white',
          //   },
          //   {
          //     code: 'bright_value',
          //     value: bright_value,
          //   },
          //   {
          //     code: 'temp_value',
          //     value: temp_value,
          //   },
          // ];
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
