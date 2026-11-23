import type { ZCLPayloadMapper } from '@thingmate/zigbee';
import { Decoder, Encoder } from '@xstd/codec';
import { decodeTuyaZigbeeTyDataResponsePayload } from '../payload/codec/decode-tuya-zigbee-ty-data-response-payload.ts';
import { encodeTuyaZigbeeTyDataResponsePayload } from '../payload/codec/encode-tuya-zigbee-ty-data-response-payload.ts';
import type { TuyaZigbeeTyDataResponseCommandArguments } from './tuya-zigbee-ty-data-response-command-arguments.ts';

export type TuyaZigbeeTyDataResponseCommandArgumentsMapper =
  ZCLPayloadMapper<TuyaZigbeeTyDataResponseCommandArguments>;

export const TUYA_ZIGBEE_TY_DATA_REPONSE_COMMAND_ARGUMENTS_MAPPER: TuyaZigbeeTyDataResponseCommandArgumentsMapper =
  Object.freeze({
    inOut: ([payload]: TuyaZigbeeTyDataResponseCommandArguments): Uint8Array => {
      return Encoder.encode(payload, encodeTuyaZigbeeTyDataResponsePayload);
    },
    outIn: (payload: Uint8Array): TuyaZigbeeTyDataResponseCommandArguments => {
      return [Decoder.decode(payload, decodeTuyaZigbeeTyDataResponsePayload)];
    },
  });
