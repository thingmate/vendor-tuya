import { describe, expect, test } from 'vitest';
import { TuyaZigbeeSequenceGenerator } from './tuya-zigbee-sequence-generator.ts';

describe('TuyaZigbeeSequenceGenerator', (): void => {
  test('starts at 0 and increments by one.', (): void => {
    const generator: TuyaZigbeeSequenceGenerator = new TuyaZigbeeSequenceGenerator();

    expect(generator.next()).toBe(0x0000);
    expect(generator.next()).toBe(0x0001);
    expect(generator.next()).toBe(0x0002);
  });

  test('wraps around to 0 after 0xffff.', (): void => {
    const generator: TuyaZigbeeSequenceGenerator = new TuyaZigbeeSequenceGenerator();

    for (let i = 0; i < 0xffff; i++) {
      generator.next(); // consumes 0x0000 to 0xfffe
    }

    expect(generator.next()).toBe(0xffff);
    expect(generator.next()).toBe(0x0000);
  });

  test('exposes a stable process-wide shared instance.', (): void => {
    expect(TuyaZigbeeSequenceGenerator.shared).toBe(TuyaZigbeeSequenceGenerator.shared);
  });
});
