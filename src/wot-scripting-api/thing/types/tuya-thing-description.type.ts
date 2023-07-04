import { IThingDescription } from '@thingmate/wot-scripting-api';
import { ITuyaDeviceCategory } from '../../../api/apis/device/types/tuya-device-category.type';

export interface ITuyaThingDescription extends IThingDescription {
  id: string;
  deviceType: ITuyaDeviceCategory;
  online: boolean;
}
