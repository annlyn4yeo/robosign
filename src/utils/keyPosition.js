import { KEYBOARD_ROWS } from "./keyboardLayout";

export function computeKeyPositions(
  keyWidth = 40,
  keyHeight = 40,
  spacing = 10
) {
  const positions = {};

  KEYBOARD_ROWS.forEach((row, rowIndex) => {
    row.forEach((key, colIndex) => {
      positions[key] = {
        x: colIndex * (keyWidth + spacing),
        y: rowIndex * (keyHeight + spacing),
      };
    });
  });

  return positions;
}
