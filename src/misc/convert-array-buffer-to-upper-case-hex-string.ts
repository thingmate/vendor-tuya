import { convertArrayBufferToHexString } from './convert-array-buffer-to-hex-string';

export function convertArrayBufferToUpperCaseHexString(
  buffer: ArrayBuffer,
): string {
  return convertArrayBufferToHexString(buffer).toUpperCase();
}
