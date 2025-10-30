import { type EntityAction } from '@thingmate/entity';

export type WriteTuyaZigbeeDataPoint<GValue> = EntityAction<[value: GValue], void>;
