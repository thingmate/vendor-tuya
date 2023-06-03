// list by country code: https://github.com/tuya/tuya-home-assistant/blob/main/docs/regions_dataCenters.md


export type ITuyaDataCenterLocation =
  | 'china'
  | 'western-america'
  | 'eastern-america'
  | 'central-europe'
  | 'western-europe'
  | 'india'
  ;

export function getTuyaApiOrigin(
  location: ITuyaDataCenterLocation,
): string {
  switch (location) {
    case 'china':
      return 'https://openapi.tuyacn.com';
    case 'western-america':
      return 'https://openapi.tuyaus.com';
    case 'eastern-america':
      return 'https://openapi-ueaz.tuyaus.com';
    case 'central-europe':
      return 'https://openapi.tuyaeu.com';
    case 'western-europe':
      return 'https://openapi-weaz.tuyaeu.com';
    case 'india':
      return 'https://openapi.tuyain.com';
  }
}
