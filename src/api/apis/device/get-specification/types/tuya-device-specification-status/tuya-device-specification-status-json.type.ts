import { ITuyaDeviceSpecificationType } from '../../tuya-device-specification-type.type';

export interface ITuyaDeviceSpecificationStatusJSON {
  code: string;
  name: string;
  type: ITuyaDeviceSpecificationType;
  values: string; // json data
}
