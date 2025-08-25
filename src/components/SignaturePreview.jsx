import { useRef } from "react";
import { computeKeyPositions } from "../utils/keyPosition";
import { resolveSvgStyles, serializeSvg, downloadSvg } from "../utils/svgUtils";
import styles from "./SignaturePreview.module.css";

export default function SignaturePreview({ name }) {
  const svgRef = useRef(null);

  const letters = name.split("");
  const keyWidth = 40;
  const keyHeight = 40;
  const spacing = 10;
  const verticalOffset = 15;
  const paddingTop = verticalOffset + 10;
  const maxWidth = 800;
  const maxHeight = 200;

  const positions = computeKeyPositions(keyWidth, keyHeight, spacing);

  // --- Compute bounding box of letters ---
  const xs = letters.map((l) => positions[l]?.x || 0);
  const ys = letters.map((l) => positions[l]?.y || 0);
  const minX = Math.min(...xs);
  const maxXPos = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxYPos = Math.max(...ys);

  const pathWidth = maxXPos - minX + keyWidth;
  const pathHeight = maxYPos - minY + keyHeight;

  // --- Build path ---
  let pathD = "";

  const offsetX = (maxWidth - pathWidth) / 2 - minX;
  const offsetY = (maxHeight - pathHeight) / 2 + paddingTop;

  letters.forEach((letter, i) => {
    const pos = positions[letter];
    if (!pos) return;

    const x = pos.x + offsetX;
    const y = pos.y + offsetY;

    if (i === 0) {
      pathD += `M ${x} ${y}`;
    } else {
      const prev = positions[letters[i - 1]];
      if (!prev) return;

      const prevX = prev.x + offsetX;
      const prevY = prev.y + offsetY;

      const randX = (Math.random() - 0.5) * keyWidth * 0.3;
      const randY = (Math.random() - 0.5) * verticalOffset;

      if (letter === letters[i - 1]) {
        const loopRadiusX = keyWidth / 2;
        const loopRadiusY = keyHeight / 2;
        pathD += ` C ${prevX + loopRadiusX} ${prevY - loopRadiusY} ${
          prevX - loopRadiusX
        } ${prevY - loopRadiusY} ${prevX} ${prevY}`;
      } else {
        const controlX = (prevX + x) / 2 + randX;
        const controlY = (prevY + y) / 2 + randY;
        pathD += ` Q ${controlX} ${controlY} ${x} ${y}`;
      }
    }
  });

  // --- Download handler ---
  const handleDownload = () => {
    if (!svgRef.current) return;
    const prepared = resolveSvgStyles(svgRef.current);
    const source = serializeSvg(prepared);
    downloadSvg(source, `${name || "signature"}.svg`);
  };

  return (
    <div className={styles.wrap}>
      {letters.length === 0 && <p>Type a name to see your signature.</p>}
      {letters.length > 0 && (
        <>
          <svg
            ref={svgRef}
            width={maxWidth}
            height={maxHeight}
            viewBox={`0 0 ${maxWidth} ${maxHeight}`}
            stroke="#08CB00"
          >
            <path
              className="signaturePath"
              d={pathD}
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button onClick={handleDownload} className={styles.downloadButton}>
            Download SVG
          </button>
        </>
      )}
    </div>
  );
}
