import {
  PrefilteredZCLClusterCommand,
  type PrefilteredZCLClusterCommandStream,
  type ZCLCommandFrameDirection,
  type ZCLPayloadMapper,
} from '@thingmate/zigbee';

/**
 * A command stream pre-filtered on the Tuya private cluster (`0xEF00`):
 * sends and observes cluster specific command frames on that cluster only.
 */
export type TuyaZigbeeCommandStream = PrefilteredZCLClusterCommandStream;

/**
 * Base class of the Tuya private cluster (`0xEF00`) specific commands.
 *
 * Binds a static direction and command id, so that `send` builds the matching
 * command frame and `observe` only emits the frames matching these static fields.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
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
