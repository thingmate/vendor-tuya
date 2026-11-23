import { cachedInstance } from '@xstd/deep-map';
import { TuyaZigbeeTyDataRequestCommand } from '../../../commands/built-in/0x00-ty-data-request/tuya-zigbee-ty-data-request-command.ts';
import { TuyaZigbeeTyDataResponseCommand } from '../../../commands/built-in/0x01-ty-data-response/tuya-zigbee-ty-data-response-command.ts';
import type { TuyaZigbeeCommandStream } from '../../../commands/command/tuya-zigbee-command.ts';
import {
  TuyaZigbeeWriteDataPointsActionRaw,
  type ZCLWriteAttributeActionRawOptions,
} from './tuya-zigbee-write-data-points-action-raw.ts';

export interface ZCLWriteAttributeActionOptions extends Omit<
  ZCLWriteAttributeActionRawOptions,
  'tyDataRequest' | 'tyDataResponse'
> {}

export class TuyaZigbeeWriteDataPointsAction extends TuyaZigbeeWriteDataPointsActionRaw {
  constructor(stream: TuyaZigbeeCommandStream, options?: ZCLWriteAttributeActionOptions) {
    super({
      ...options,
      tyDataRequest: cachedInstance(TuyaZigbeeTyDataRequestCommand, stream),
      tyDataResponse: cachedInstance(TuyaZigbeeTyDataResponseCommand, stream),
    });
  }
}
