export function stableRandomOffset(str, maxOffset = 8) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // convert to 32bit integer
  }
  // Map hash to -maxOffset..+maxOffset
  return (hash % (2 * maxOffset)) - maxOffset;
}
