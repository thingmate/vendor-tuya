# @thingmate/vendor-tuya

## 1.0.0 (2026-11-24)

### Major Changes

- First stable release of the Tuya adapters: typed, stream-based adapters for the Tuya Zigbee private cluster (`0xEF00`). ([#1](https://github.com/thingmate/vendor-tuya/pull/1))
  
  - Commands for `TY_DATA_REQUEST` (0x00), `TY_DATA_RESPONSE` (0x01), `TY_DATA_REPORT` (0x02) and `TY_DATA_QUERY` (0x03), each bound to its direction and payload mapper.
  - Actions writing data points with a sequence-number-correlated acknowledgement, and querying a device for its current values.
  - Data point properties bundling read, write and observe for a single data point, covering the six wire data types: raw, boolean, value (uint32), string, enum and bitmap.
  - Outgoing sequence numbers stamped by a shared, wrap-around `TuyaZigbeeSequenceGenerator`.
