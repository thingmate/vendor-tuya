import { ITuyaDeviceSpecificationStatusJSON } from './tuya-device-specification-status-json.type';
import { ITuyaDeviceSpecificationStatus } from './tuya-device-specification-status.type';

export function normalizeTuyaDeviceSpecificationStatus(
  {
    values,
    ...options
  }: ITuyaDeviceSpecificationStatusJSON,
): ITuyaDeviceSpecificationStatus {
  return {
    ...options,
    values: JSON.parse(values),
  };
}
