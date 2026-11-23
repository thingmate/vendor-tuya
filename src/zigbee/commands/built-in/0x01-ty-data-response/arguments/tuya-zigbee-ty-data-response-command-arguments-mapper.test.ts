import { describe, expect, test } from 'vitest';
import { TUYA_ZIGBEE_TY_DATA_REPONSE_COMMAND_ARGUMENTS_MAPPER } from './tuya-zigbee-ty-data-response-command-arguments-mapper.ts';

const ARGUMENTS = [
  {
    seq: 0x1234,
    dataPoints: [{ id: 0x01, type: 0x01, value: true }],
  },
] as const;

describe('TUYA_ZIGBEE_TY_DATA_REPONSE_COMMAND_ARGUMENTS_MAPPER', (): void => {
  test('encodes the payload arguments to their wire format.', (): void => {
    // seq 0x1234 | data point: id 0x01 | type 0x01 (boolean) | length 0x0001 | value 0x01
    expect(TUYA_ZIGBEE_TY_DATA_REPONSE_COMMAND_ARGUMENTS_MAPPER.inOut(ARGUMENTS)).toEqual(
      new Uint8Array([0x12, 0x34, 0x01, 0x01, 0x00, 0x01, 0x01]),
    );
  });

  test('decodes the wire format back to the payload arguments.', (): void => {
    expect(
      TUYA_ZIGBEE_TY_DATA_REPONSE_COMMAND_ARGUMENTS_MAPPER.outIn(
        new Uint8Array([0x12, 0x34, 0x01, 0x01, 0x00, 0x01, 0x01]),
      ),
    ).toEqual(ARGUMENTS);
  });
});
