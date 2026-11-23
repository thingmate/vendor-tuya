import { cachedInstance } from '@xstd/deep-map';
import { TuyaZigbeeTyDataQueryCommand } from '../../../../commands/built-in/0x03-ty-data-query/tuya-zigbee-ty-data-query-command.ts';
import type { TuyaZigbeeCommandStream } from '../../../../commands/command/tuya-zigbee-command.ts';
import { TuyaZigbeeDataPointObserver } from '../observe-data-point/tuya-zigbee-data-point-observer.ts';
import { TuyaZigbeeReadDataPointActionRaw } from './tuya-zigbee-read-data-point-action-raw.ts';

export class TuyaZigbeeReadDataPointAction<
  GValue,
> extends TuyaZigbeeReadDataPointActionRaw<GValue> {
  constructor(stream: TuyaZigbeeCommandStream, dataPointId: number) {
    super({
      observer: cachedInstance(TuyaZigbeeDataPointObserver<GValue>, stream, dataPointId),
      tyDataQuery: cachedInstance(TuyaZigbeeTyDataQueryCommand, stream),
    });
  }
}
