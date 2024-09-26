import { IWindowConfig } from "@/types";
import React from "react";
import ReactDOM from "react-dom";

export const createPopup = (windowConfig: IWindowConfig) => {
  const features = [
    `left=${windowConfig.left || 5}`,
    `top=${windowConfig.top || 5}`,
    `width=${windowConfig.width || 250}`,
    `height=${windowConfig.height || 250}`,
    `menubar=${windowConfig.menubar || "no"}`,
    `toolbar=${windowConfig.toolbar || "no"}`,
    `location=${windowConfig.location || "no"}`,
    `status=${windowConfig.status || "no"}`,
    `resizable=${windowConfig.resizable || "yes"}`,
    `scrollbars=${windowConfig.scrollbars || "yes"}`,
    `${
      windowConfig.popup == undefined || windowConfig.popup == true
        ? "popup"
        : "popup=false"
    }`,
  ].join(",");
  return window.open(
    windowConfig.url || "",
    windowConfig.windowName  || Math.random().toString(),
    features
  );
};

/**
 * Copies styles, fonts, and additional head elements from the source document to the destination document.
 *
 * @param src - The source document from which styles and fonts are copied.
 * @param dest - The destination document where styles and fonts are applied.
 * @param extraHeadHTMLTags - An array of JSX elements or HTML nodes (like <style> or <script>) to append to the head.
 *
 * @experimental This parameter (extraHeadHTMLTags) is experimental and may change in future releases.
 */
export function copyStyles(
  src: Document,
  dest: Document,
  extraHeadHTMLTags?: React.ReactNode[]
) {
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

  // Append extra HTML tags (like <style> and <script>) to the destination head
  if (extraHeadHTMLTags) {
    extraHeadHTMLTags.forEach((tag) => {
      if (React.isValidElement(tag)) {
        const container = document.createElement("div");
        ReactDOM.render(tag, container); // Render the JSX element into the container
        dest.head.appendChild(container.firstChild!); // Append the first child of the container
      }
    });
  }
}
