import type { VoidArguments } from '@thingmate/zigbee';
import { AsyncFunction } from '@xstd/async-function';
import { cachedInstance } from '@xstd/deep-map';
import { TuyaZigbeeTyDataQueryCommand } from '../../../commands/built-in/0x03-ty-data-query/tuya-zigbee-ty-data-query-command.ts';
import type { TuyaZigbeeCommandStream } from '../../../commands/command/tuya-zigbee-command.ts';

export class TuyaZigbeeQueryDataPointsAction extends AsyncFunction<VoidArguments, void> {
  constructor(stream: TuyaZigbeeCommandStream) {
    super(cachedInstance(TuyaZigbeeTyDataQueryCommand, stream).send);
  }
}
