import { type Action } from '@xstd/action';

export type WriteTuyaZigbeeDataPointAction<GValue> = Action<[value: GValue], void>;
