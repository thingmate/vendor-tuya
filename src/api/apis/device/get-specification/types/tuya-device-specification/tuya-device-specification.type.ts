import { ITuyaDeviceCategory } from '../../../types/tuya-device-category.type';
import { ITuyaDeviceSpecificationFunction } from '../tuya-device-specification-function/tuya-device-specification-function.type';
import { ITuyaDeviceSpecificationStatus } from '../tuya-device-specification-status/tuya-device-specification-status.type';

export interface ITuyaDeviceSpecification {
  category: ITuyaDeviceCategory;
  functions: ITuyaDeviceSpecificationFunction[];
  status: ITuyaDeviceSpecificationStatus[];
}
