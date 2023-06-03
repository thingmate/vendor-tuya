export function convertUint8ArrayToHexString(
  array: Uint8Array,
): string {
  return array.reduce((str: string, value: number): string => {
    return str + value.toString(16).padStart(2, '0');
  }, '');
}
