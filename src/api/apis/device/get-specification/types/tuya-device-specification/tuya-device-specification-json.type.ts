import { ITuyaDeviceCategory } from '../../../types/tuya-device-category.type';
import { ITuyaDeviceSpecificationFunctionJSON } from '../tuya-device-specification-function/tuya-device-specification-function-json.type';
import { ITuyaDeviceSpecificationStatusJSON } from '../tuya-device-specification-status/tuya-device-specification-status-json.type';

export interface ITuyaDeviceSpecificationJSON {
  category: ITuyaDeviceCategory;
  functions: ITuyaDeviceSpecificationFunctionJSON[];
  status: ITuyaDeviceSpecificationStatusJSON[];
}
