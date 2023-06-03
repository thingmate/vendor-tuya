import { ITuyaDeviceSpecificationType } from '../../tuya-device-specification-type.type';

export interface ITuyaDeviceSpecificationFunction {
  code: string;
  desc: string;
  name: string;
  type: ITuyaDeviceSpecificationType;
  values: any;
}
