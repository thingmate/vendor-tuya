import { convertUint8ArrayToHexString } from './convert-uint8-array-to-hex-string';

export function convertArrayBufferToHexString(
  buffer: ArrayBuffer,
): string {
  return convertUint8ArrayToHexString(new Uint8Array(buffer));
}
