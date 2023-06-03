import { ITuyaDeviceSpecificationType } from '../../tuya-device-specification-type.type';

export interface ITuyaDeviceSpecificationStatus {
  code: string;
  name: string;
  type: ITuyaDeviceSpecificationType;
  values: any;
}
