import { ITuyaDeviceCategory } from '../../types/tuya-device-category.type';

export interface ITuyaDeviceDetailsJSON {
  active_time: number; // timestamp in seconds
  category: ITuyaDeviceCategory;
  category_name: string;
  create_time: number; // timestamp in seconds
  gateway_id: string;
  icon: string;
  id: string;
  ip: string;
  lat: string;
  local_key: string;
  lon: string;
  model: string;
  name: string;
  online: boolean;
  owner_id: string;
  product_id: string;
  product_name: string;
  sub: boolean;
  time_zone: string;
  update_time: number;
  uuid: string;
}
