import {
  PrefilteredZCLClusterCommand,
  type PrefilteredZCLClusterCommandStream,
  type ZCLCommandFrameDirection,
  type ZCLPayloadMapper,
} from '@thingmate/zigbee';

export type TuyaZigbeeCommandStream = PrefilteredZCLClusterCommandStream;

export class TuyaZigbeeCommand<
  GArguments extends readonly unknown[],
> extends PrefilteredZCLClusterCommand<GArguments> {
  constructor(
    stream: TuyaZigbeeCommandStream,
    staticDirection: ZCLCommandFrameDirection,
    staticCommand: number,
    map: ZCLPayloadMapper<GArguments>,
  ) {
    super(stream, 0xef00, staticDirection, staticCommand, map);
  }
}
