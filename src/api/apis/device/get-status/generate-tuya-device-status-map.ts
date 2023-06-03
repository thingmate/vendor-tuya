import { ITuyaDeviceStatusMap } from './tuya-device-status-map.type';
import { ITuyaDeviceStatusJSON } from './types/tuya-device-status-json.type';

export function generateTuyaDeviceStatusMap(
  status: readonly ITuyaDeviceStatusJSON[],
): ITuyaDeviceStatusMap {
  return new Map<string, any>(
    status.map((status: ITuyaDeviceStatusJSON): [string, any] => {
      return [status.code, status.value];
    }),
  );
}

