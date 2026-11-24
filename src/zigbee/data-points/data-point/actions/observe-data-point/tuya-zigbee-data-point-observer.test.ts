import { Encoder } from '@xstd/codec';
import { describe, expect, test } from 'vitest';
import { createFakeCommandStream } from '../../../../../../test/fake-command-stream/fake-command-stream.ts';
import { encodeTuyaZigbeeTyDataReportPayload } from '../../../../commands/built-in/0x02-ty-data-report/payload/codec/encode-tuya-zigbee-ty-data-report-payload.ts';
import { TuyaZigbeeDataPointObserver } from './tuya-zigbee-data-point-observer.ts';

describe('TuyaZigbeeDataPointObserver', (): void => {
  test('emits the value of the observed data point from report frames.', async (): Promise<void> => {
    const { stream, emit } = createFakeCommandStream();
    const observer = new TuyaZigbeeDataPointObserver<number>(stream, 2);

    const promise = observer.observe.first(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x02,
      payload: Encoder.encode(
        {
          seq: 0x0001,
          dataPoints: [
            { id: 1, type: 0x02, value: 100 },
            { id: 2, type: 0x02, value: 0x2a },
          ],
        },
        encodeTuyaZigbeeTyDataReportPayload,
      ),
    });

    expect(await promise).toBe(0x2a);
  });

  test('drops report frames without the observed data point.', async (): Promise<void> => {
    const { stream, emit } = createFakeCommandStream();
    const observer = new TuyaZigbeeDataPointObserver<number>(stream, 2);

    const promise = observer.observe.first(new AbortController().signal);
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x02,
      payload: Encoder.encode(
        { seq: 0x0001, dataPoints: [{ id: 1, type: 0x02, value: 100 }] },
        encodeTuyaZigbeeTyDataReportPayload,
      ),
    });
    emit({
      cluster: 0xef00,
      clusterSpecific: true,
      direction: 'server-to-client',
      command: 0x02,
      payload: Encoder.encode(
        { seq: 0x0002, dataPoints: [{ id: 2, type: 0x02, value: 0x2a }] },
        encodeTuyaZigbeeTyDataReportPayload,
      ),
    });

    expect(await promise).toBe(0x2a);
  });
});
