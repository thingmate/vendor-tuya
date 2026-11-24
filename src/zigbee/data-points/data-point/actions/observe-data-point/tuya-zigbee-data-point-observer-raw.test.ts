import { describe, expect, test } from 'vitest';
import { createFakeObserveAbility } from '../../../../../../test/fake-observe-ability/fake-observe-ability.ts';
import { type TuyaZigbeeTyDataReportCommandArguments } from '../../../../commands/built-in/0x02-ty-data-report/arguments/tuya-zigbee-ty-data-report-command-arguments.ts';
import { TuyaZigbeeDataPointObserverRaw } from './tuya-zigbee-data-point-observer-raw.ts';

describe('TuyaZigbeeDataPointObserverRaw', (): void => {
  test('emits the value of the observed data point.', async (): Promise<void> => {
    const reports = createFakeObserveAbility<TuyaZigbeeTyDataReportCommandArguments>();
    const observer = new TuyaZigbeeDataPointObserverRaw<number>({
      tyDataReport: reports.ability,
      dataPointId: 2,
    });

    const promise = observer.observe.first(new AbortController().signal);
    reports.emit([
      {
        seq: 0x0001,
        dataPoints: [
          { id: 1, type: 0x02, value: 100 },
          { id: 2, type: 0x02, value: 0x2a },
          { id: 2, type: 0x02, value: 99 }, // duplicated id: the first occurrence wins
        ],
      },
    ]);

    expect(await promise).toBe(0x2a);
  });

  test('drops reports without the observed data point.', async (): Promise<void> => {
    const reports = createFakeObserveAbility<TuyaZigbeeTyDataReportCommandArguments>();
    const observer = new TuyaZigbeeDataPointObserverRaw<number>({
      tyDataReport: reports.ability,
      dataPointId: 2,
    });

    const promise = observer.observe.first(new AbortController().signal);
    reports.emit([
      {
        seq: 0x0001,
        dataPoints: [{ id: 1, type: 0x02, value: 100 }],
      },
    ]);
    reports.emit([
      {
        seq: 0x0002,
        dataPoints: [{ id: 2, type: 0x02, value: 0x2a }],
      },
    ]);

    expect(await promise).toBe(0x2a);
  });

  test('emits the value of every matching report.', async (): Promise<void> => {
    const reports = createFakeObserveAbility<TuyaZigbeeTyDataReportCommandArguments>();
    const observer = new TuyaZigbeeDataPointObserverRaw<number>({
      tyDataReport: reports.ability,
      dataPointId: 2,
    });

    const controller: AbortController = new AbortController();
    const iterator = observer.observe.values(controller.signal)[Symbol.asyncIterator]();

    const first: Promise<IteratorResult<number>> = iterator.next();
    reports.emit([
      {
        seq: 0x0001,
        dataPoints: [{ id: 2, type: 0x02, value: 10 }],
      },
    ]);
    expect((await first).value).toBe(10);

    const second: Promise<IteratorResult<number>> = iterator.next();
    reports.emit([
      {
        seq: 0x0002,
        dataPoints: [{ id: 2, type: 0x02, value: 20 }],
      },
    ]);
    expect((await second).value).toBe(20);

    controller.abort(); // disposes the established resource
  });
});
