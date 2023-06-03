import { ITuyaDeviceDetailsJSON } from '../../get-details/types/tuya-device-details-json.type';

export interface ITuyaDeviceListJSON {
  has_more: boolean;
  last_row_key: string;
  total: number;
  list: ITuyaDeviceDetailsJSON;
}

