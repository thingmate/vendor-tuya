import {
  normalizeTuyaDeviceSpecificationFunction,
} from '../tuya-device-specification-function/normalize-tuya-device-specification-function';
import { normalizeTuyaDeviceSpecificationStatus } from '../tuya-device-specification-status/normalize-tuya-device-specification-status';
import { ITuyaDeviceSpecificationJSON } from './tuya-device-specification-json.type';
import { ITuyaDeviceSpecification } from './tuya-device-specification.type';

export function normalizeTuyaDeviceSpecification(
  {
    category,
    functions,
    status,
  }: ITuyaDeviceSpecificationJSON,
): ITuyaDeviceSpecification {
  return {
    category,
    functions: functions.map(normalizeTuyaDeviceSpecificationFunction),
    status: status.map(normalizeTuyaDeviceSpecificationStatus),
  };
}
