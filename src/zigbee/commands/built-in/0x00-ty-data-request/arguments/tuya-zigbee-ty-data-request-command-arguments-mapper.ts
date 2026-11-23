import type { ZCLPayloadMapper } from '@thingmate/zigbee';
import { Decoder, Encoder } from '@xstd/codec';
import { decodeTuyaZigbeeTyDataRequestPayload } from '../payload/codec/decode-tuya-zigbee-ty-data-request-payload.ts';
import { encodeTuyaZigbeeTyDataRequestPayload } from '../payload/codec/encode-tuya-zigbee-ty-data-request-payload.ts';
import type { TuyaZigbeeTyDataRequestCommandArguments } from './tuya-zigbee-ty-data-request-command-arguments.ts';

export type TuyaZigbeeTyDataRequestCommandArgumentsMapper =
  ZCLPayloadMapper<TuyaZigbeeTyDataRequestCommandArguments>;

export const TUYA_ZIGBEE_TY_DATA_REQUEST_COMMAND_ARGUMENTS_MAPPER: TuyaZigbeeTyDataRequestCommandArgumentsMapper =
  Object.freeze({
    inOut: ([payload]: TuyaZigbeeTyDataRequestCommandArguments): Uint8Array => {
      return Encoder.encode(payload, encodeTuyaZigbeeTyDataRequestPayload);
    },
    outIn: (payload: Uint8Array): TuyaZigbeeTyDataRequestCommandArguments => {
      return [Decoder.decode(payload, decodeTuyaZigbeeTyDataRequestPayload)];
    },
  });
