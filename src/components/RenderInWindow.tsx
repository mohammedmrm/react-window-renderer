/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  DEFAULT_WINDOW_X,
  DEFAULT_WINDOW_Y,
  ICON_HEIGHT,
  ICON_WIDTH,
  STYLE_LOADING_DELAY,
} from "@/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import windowCloseIcon from "../assets/window-close.svg";
import windowOpenIcon from "../assets/window-open.svg";
import { IRenderInWindow } from "../types/index";
import { copyStyles, createPopup } from "../utils";

const RenderInWindow = ({
  open,
  setOpen,
  children,
  returnWindow,
  showChilderWhenClose,
  showOpenWindowIcon,
  showCloseWindowIcon,
  extraHeadHTMLTags,
  windowConfig,
  closeWindowIconConfig,
  openWindowIconConfig,
}: IRenderInWindow) => {
  const _window = useRef<Window | null>(null);
  const [ready, setReady] = useState(false);
  const isExtended = useRef<boolean>();

  const closePopup = useCallback(() => {
    if (_window.current) {
      _window.current.close();
      _window.current = null;
      returnWindow(null); // Cleanup
    }
  }, [returnWindow]);

  const preparePopup = useCallback(async () => {
    if (!open || _window.current) return; // Avoid recreating window

    try {
      let currentScreen;
      // Handle Chrome's window management API if available
      // read here https://developer.chrome.com/docs/capabilities/web-apis/window-management
      if ("getScreenDetails" in window) {
        // For `getScreenDetails` (Chrome-specific)
        //@ts-ignore
        const screenDetails = await window.getScreenDetails();
        currentScreen = screenDetails.currentScreen;
        _window.current = createPopup({
          ...windowConfig,
          left: windowConfig?.left || screen.width,
          top: windowConfig?.top || screen.height,
          width: windowConfig?.width || screen.width,
          height: windowConfig?.height || screen.height,
        });
        _window.current?.moveTo(
          currentScreen.isPrimary ? currentScreen.width : DEFAULT_WINDOW_X,
          0
        );
      } else if ("getScreens" in window) {
        // For `getScreens` API (Chrome)
        //@ts-ignore
        const screenDetails = await window.getScreens();
        currentScreen = screenDetails.currentScreen;
        isExtended.current = currentScreen.isExtended;
        _window.current = createPopup({
          ...windowConfig,
          left: windowConfig?.left || screen.width,
          top: windowConfig?.top || screen.height,
          width: windowConfig?.width || screen.width,
          height: windowConfig?.height || screen.height,
        });
        _window.current?.moveTo(
          currentScreen.isPrimary ? currentScreen.width * 2 : DEFAULT_WINDOW_X,
          DEFAULT_WINDOW_Y
        );
      } else {
        // Fallback logic if no window management API is available
        _window.current = createPopup({
          ...windowConfig,
          //@ts-ignore
          left: windowConfig?.left || (screen.left > 0 ? 0 : screen.width),
          width: windowConfig?.width || screen.width,
          height: windowConfig?.height || screen.height,
        });

        _window.current?.moveTo(
          //@ts-ignore
          screen.left > 0 ? 0 : screen.width,
          DEFAULT_WINDOW_Y
        );
      }

      if (_window.current) {
        returnWindow(_window.current);
        _window.current.onbeforeunload = () => {
          setReady(false);
          setOpen(false);
        };

        copyStyles(document, _window.current.document, extraHeadHTMLTags);

        await new Promise((resolve) =>
          setTimeout(resolve, STYLE_LOADING_DELAY)
        ); // Small delay to ensure styles are applied
        setReady(true);
      }
    } catch (error) {
      console.error("Failed to create window:", error);
    }
  }, [open, windowConfig, extraHeadHTMLTags, setOpen, returnWindow]);

  useEffect(() => {
    if (open) {
      preparePopup();
    } else {
      closePopup();
    }
    // Cleanup on component unmount or when popup closes
    return () => {
      if (!open) closePopup();
    };
  }, [open, preparePopup, closePopup]);

  // Render children inside the new window when ready
  if (open && ready && _window.current) {
    return createPortal(
      <div style={{ display: "grid", width: "100%", flexFlow: "column" }}>
        {showCloseWindowIcon && (
          <div
            style={{ display: "flex", justifySelf: "end", cursor: "pointer" }}
            onClick={() => setOpen(false)}
          >
            <img
              src={windowCloseIcon}
              alt="Close"
              width={closeWindowIconConfig?.width || ICON_WIDTH}
              height={closeWindowIconConfig?.height || ICON_HEIGHT}
            />
          </div>
        )}
        {children}
      </div>,
      _window.current.document.body // Attach to the new window's body
    );
  }

  // Return the children inside the main window when not hiding them on close
  if (showChilderWhenClose) {
    return (
      <div style={{ display: "grid", width: "100%", flexFlow: "column" }}>
        {showOpenWindowIcon && (
          <span
            onClick={() => setOpen(true)}
            style={{ display: "flex", justifySelf: "end", cursor: "pointer" }}
          >
            <img
              src={windowOpenIcon}
              alt="Open"
              width={openWindowIconConfig?.width || ICON_WIDTH}
              height={openWindowIconConfig?.height || ICON_HEIGHT}
            />
          </span>
        )}
        {children}
      </div>
    );
  }
  return null;
};

export default RenderInWindow;
