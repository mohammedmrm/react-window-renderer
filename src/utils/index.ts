
export const createPopup = (
  screenX: number,
  screenY: number,
  width: number,
  height: number
) => {
  const features = [
    `left=${screenX}`,
    `top=${screenY}`,
    `width=${width}`,
    `height=${height}`,
    `menubar=no`,
    `toolbar=no`,
    `location=no`,
    `status=no`,
    `resizable=yes`,
    `scrollbars=no`,
    `popup`,
  ].join(",");
  // TODO(crbug.com/1153004): The onPopupClose beforeunload works with about:blank popups...
  // return window.open("about:blank", Math.random().toString(), features);
  return window.open("", Math.random().toString(), features);
};

export function copyStyles(src: Document, dest: Document) {
  // Copy child nodes from the head of the source document to the destination
  const parentHead = window.document.querySelector("head")?.childNodes || [];
  parentHead.forEach((item) => {
    if (item instanceof Node) {
      dest.head.appendChild(item.cloneNode(true)); // Deep copy of each head element
    }
  });

  // Copy stylesheets from the source document to the destination
  Array.from(src.styleSheets).forEach((styleSheet) => {
    if (styleSheet.ownerNode instanceof Node) {
      dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
    }
  });

  // Copy fonts from the source document to the destination
  Array.from(src.fonts).forEach((font) => {
    dest.fonts.add(font);
  });
}
