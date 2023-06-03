import { ITuyaDeviceSpecificationType } from '../../tuya-device-specification-type.type';

export interface ITuyaDeviceSpecificationFunctionJSON {
  code: string;
  desc: string;
  name: string;
  type: ITuyaDeviceSpecificationType;
  values: string; // json data
}
