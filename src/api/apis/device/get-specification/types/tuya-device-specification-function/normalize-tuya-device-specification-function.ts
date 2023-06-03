import { ITuyaDeviceSpecificationFunctionJSON } from './tuya-device-specification-function-json.type';
import { ITuyaDeviceSpecificationFunction } from './tuya-device-specification-function.type';

export function normalizeTuyaDeviceSpecificationFunction(
  {
    values,
    ...options
  }: ITuyaDeviceSpecificationFunctionJSON,
): ITuyaDeviceSpecificationFunction {
  return {
    ...options,
    values: JSON.parse(values),
  };
}
