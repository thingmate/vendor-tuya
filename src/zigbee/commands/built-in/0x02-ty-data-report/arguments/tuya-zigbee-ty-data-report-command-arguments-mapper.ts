import type { ZCLPayloadMapper } from '@thingmate/zigbee';
import { Decoder, Encoder } from '@xstd/codec';
import { decodeTuyaZigbeeTyDataReportPayload } from '../payload/codec/decode-tuya-zigbee-ty-data-report-payload.ts';
import { encodeTuyaZigbeeTyDataReportPayload } from '../payload/codec/encode-tuya-zigbee-ty-data-report-payload.ts';
import type { TuyaZigbeeTyDataReportCommandArguments } from './tuya-zigbee-ty-data-report-command-arguments.ts';

export type TuyaZigbeeTyDataReportCommandArgumentsMapper =
  ZCLPayloadMapper<TuyaZigbeeTyDataReportCommandArguments>;

export const TUYA_ZIGBEE_TY_DATA_REPORT_COMMAND_ARGUMENTS_MAPPER: TuyaZigbeeTyDataReportCommandArgumentsMapper =
  Object.freeze({
    inOut: ([payload]: TuyaZigbeeTyDataReportCommandArguments): Uint8Array => {
      return Encoder.encode(payload, encodeTuyaZigbeeTyDataReportPayload);
    },
    outIn: (payload: Uint8Array): TuyaZigbeeTyDataReportCommandArguments => {
      return [Decoder.decode(payload, decodeTuyaZigbeeTyDataReportPayload)];
    },
  });
