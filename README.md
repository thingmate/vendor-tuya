[![npm (scoped)](https://img.shields.io/npm/v/@thingmate/vendor-tuya.svg)](https://www.npmjs.com/package/@thingmate/vendor-tuya)
![npm](https://img.shields.io/npm/dm/@thingmate/vendor-tuya.svg)
![NPM](https://img.shields.io/npm/l/@thingmate/vendor-tuya.svg)
![npm type definitions](https://img.shields.io/npm/types/@thingmate/vendor-tuya.svg)
![AI generation](https://img.shields.io/badge/AI_generation-low-yellow)

<picture>
  <source height="64" media="(prefers-color-scheme: dark)" srcset="https://github.com/thingmate/website/blob/main/assets/logo/png/logo-large-dark.png?raw=true">
  <source height="64" media="(prefers-color-scheme: light)" srcset="https://github.com/thingmate/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
  <img height="64" alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://github.com/thingmate/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
</picture>

## @thingmate/vendor-tuya

Tuya adapters: typed, stream-based adapters for the Tuya Zigbee private cluster (`0xEF00`).

## 📦 Installation

```shell
yarn add @thingmate/vendor-tuya
# or
npm install @thingmate/vendor-tuya --save
```

## 📜 Documentation

### Overview

The library turns the Tuya private cluster (`0xEF00`) traffic into typed, stream-based objects:

- **Commands** bind each private command — `TY_DATA_REQUEST` (0x00), `TY_DATA_RESPONSE` (0x01),
  `TY_DATA_REPORT` (0x02) and `TY_DATA_QUERY` (0x03) — to its direction and payload mapper over a
  ZCL command-frame stream.
- **Actions** compose the commands into promises: writing data points and awaiting the
  sequence-number-correlated acknowledgement, or querying a device and awaiting the reported value.
- **Properties** expose `read` (a promise of the current value), `write` (send and await the
  acknowledgement) and `observe` (a live stream of the reported values) for a single data point,
  typed after its wire data type.

### Concepts

```
ZCL command frame stream   ← your Zigbee transport (e.g. coordinator.command from @thingmate/zigbee)
        │
        ▼
TuyaZigbeeTyDataRequestCommand / TuyaZigbeeTyDataReportCommand / …   ← private cluster commands
        │
        ▼
TuyaZigbeeWriteDataPointsAction / TuyaZigbeeReadDataPointAction / …   ← request/response actions
        │
        ▼
TuyaZigbeeDataPointProperty, TuyaZigbeeBooleanDataPointProperty / …   ← terminal property views
```

- A **data point** is one `dpid | type | len | value` record carried after the 2-byte sequence
  number in every private command payload.
- **Commands** take the command-frame stream as their only constructor argument, and expose `send`
  and `observe`.
- **Actions** compose a sending command with an observing one (e.g. `TY_DATA_REQUEST` with
  `TY_DATA_RESPONSE`), correlating the response to the request by sequence number.
- **Properties** are the classes you consume: bound to a data point id and wire data type, they
  bundle read, write and observe for that data point.

### Usage

#### Writing a data point

```ts
import { TuyaZigbeeBooleanDataPointProperty } from '@thingmate/vendor-tuya';

// stream: the ZCL command-frame stream of your Zigbee transport
const relay = new TuyaZigbeeBooleanDataPointProperty(stream, 1);

// Send the value and await the device acknowledgement (TY_DATA_RESPONSE):
await relay.write.call(new AbortController().signal, true);
```

#### Reading a data point

```ts
const relay = new TuyaZigbeeBooleanDataPointProperty(stream, 1);

// Query the device (TY_DATA_QUERY) and resolve with the first reported value:
const current: boolean = await relay.read.call(new AbortController().signal);
```

#### Observing reported values

```ts
const relay = new TuyaZigbeeBooleanDataPointProperty(stream, 1);

for await (const value of relay.observe.values(new AbortController().signal)) {
  console.log('relay:', value);
  if (value) {
    break; // ends the iteration, disposing of the underlying resource automatically
  }
}
```

> **Resource lifecycle — important:** observing opens a live `ListenerResource`. Aborting the
> call's signal aborts the _establishment_ of the resource only — once established, the resource
> stays alive and **must be closed**, or it will keep receiving and holding values. Two options:
>
> - consume it through a loop (or `first()` for a single value): the underlying resource is
>   disposed of automatically when the loop breaks, the signal aborts, or the resource closes;
> - or hold the resource returned by `observe.call(signal)` and close it explicitly with the async
>   disposal protocol (`await using`) or `await resource.close()`.
>
>   The `await using` form requires a toolchain supporting the async disposal protocol
>   (TypeScript 5.2+); otherwise close the resource explicitly with `await resource.close()`.

#### Data point types

Every value crosses the wire typed by its data point type:

| Type    | Id   | Wire                | JS value                                 |
| ------- | ---- | ------------------- | ---------------------------------------- |
| Raw     | 0x00 | N bytes             | `Uint8Array`                             |
| Boolean | 0x01 | 1 byte              | `boolean`                                |
| Value   | 0x02 | 4 bytes, big-endian | `number` (uint32)                        |
| String  | 0x03 | N bytes             | `string` (single-byte characters)        |
| Enum    | 0x04 | 1 byte              | `number` (0-255)                         |
| Bitmap  | 0x05 | 1/2/4 bytes, BE     | `{ length: 1 \| 2 \| 4, value: number }` |

The built-in property classes cover the common types; for the others, use the generic
`TuyaZigbeeDataPointProperty` with the wire data type of your choice:

```ts
import {
  TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP,
  TuyaZigbeeDataPointProperty,
} from '@thingmate/vendor-tuya';

const flags = new TuyaZigbeeDataPointProperty(stream, 6, TUYA_ZIGBEE_DATA_POINT_TYPE_BITMAP);

await flags.write.call(new AbortController().signal, { length: 1, value: 0b101 });
```

#### Writing several data points at once

Beneath the properties, the actions layer stays reachable. `TuyaZigbeeWriteDataPointsAction` sends
a `TY_DATA_REQUEST` and resolves with the device's `TY_DATA_RESPONSE`, correlated by sequence
number — enable `checkDataPointIds` to additionally require the response to echo every requested
data point id:

```ts
import { TuyaZigbeeWriteDataPointsAction } from '@thingmate/vendor-tuya';

const write = new TuyaZigbeeWriteDataPointsAction(stream, { checkDataPointIds: true });

const response = await write.call(new AbortController().signal, [
  {
    seq: 1, // stamped for you by TuyaZigbeeSequenceGenerator.shared by default
    dataPoints: [
      { id: 1, type: 0x01, value: true },
      { id: 2, type: 0x02, value: 42 },
    ],
  },
]);
```

Outgoing sequence numbers are stamped by a `TuyaZigbeeSequenceGenerator` — a process-wide shared
instance by default, wrapping around at `0xffff`. Pass your own through the options (`seq`) when
you need one per device or link instead.

### Supported private commands

| Command            | Id   | Direction        | Class                             |
| ------------------ | ---- | ---------------- | --------------------------------- |
| `TY_DATA_REQUEST`  | 0x00 | gateway → device | `TuyaZigbeeTyDataRequestCommand`  |
| `TY_DATA_RESPONSE` | 0x01 | device → gateway | `TuyaZigbeeTyDataResponseCommand` |
| `TY_DATA_REPORT`   | 0x02 | device → gateway | `TuyaZigbeeTyDataReportCommand`   |
| `TY_DATA_QUERY`    | 0x03 | gateway → device | `TuyaZigbeeTyDataQueryCommand`    |

The library is not complete yet and grows incrementally: the MCU version, OTA and time
synchronization commands (`0x10` to `0x15`, `0x24`) are not implemented yet.

### Architecture

The library is layered: commands bind the private cluster traffic per command id, codecs encode
and decode the data point payloads (`dpid | type | len | value`), actions compose sending and
observing with sequence-number correlation, and properties bundle read, write and observe into
the terminal classes. Contributions follow the existing one-module-per-file layout.

## 🧾 License

MIT — see [LICENSE](LICENSE).
