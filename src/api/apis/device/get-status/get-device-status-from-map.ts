import { ITuyaDeviceStatusMap } from './tuya-device-status-map.type';

export function getDeviceStatusFromMap(
  map: ITuyaDeviceStatusMap,
  code: string,
): any {
  if (map.has(code)) {
    return map.get(code);
  } else {
    throw new Error(`Unable to find "${code}" status.`);
  }
}
