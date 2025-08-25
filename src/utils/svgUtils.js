export function resolveSvgStyles(svgElement) {
  const clone = svgElement.cloneNode(true);

  // Replace CSS variables on <path> strokes
  const paths = clone.querySelectorAll("path");
  paths.forEach((path) => {
    const stroke = path.getAttribute("stroke");
    if (stroke && stroke.includes("var(")) {
      const varName = stroke.match(/var\((.*?)\)/)[1];
      const computed = getComputedStyle(svgElement)
        .getPropertyValue(varName)
        .trim();
      if (computed) {
        path.setAttribute("stroke", computed);
      }
    }
  });

  return clone;
}

/**
 * Convert an SVG DOM element into a string with XML header.
 */
export function serializeSvg(svgElement) {
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgElement);
  return `<?xml version="1.0" encoding="UTF-8"?>\n${source}`;
}

/**
 * Trigger a download of the given text as an .svg file.
 */
export function downloadSvg(source, filename = "signature.svg") {
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
