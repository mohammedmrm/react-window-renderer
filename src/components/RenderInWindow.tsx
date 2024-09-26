/* eslint-disable @typescript-eslint/ban-ts-comment */
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
          currentScreen.isPrimary ? currentScreen.width : 0,
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
          currentScreen.isPrimary ? currentScreen.width * 2 : 0,
          0
        );
      } else {
        // Fallback logic if no window management API is available
        _window.current = createPopup({
          ...windowConfig,
          //@ts-ignore
          left: windowConfig?.left || screen.left > 0 ? 0 : screen.width,
          width: windowConfig?.width || screen.width,
          height: windowConfig?.height || screen.height,
        });
        //@ts-ignore
        _window.current?.moveTo(screen.left > 0 ? 0 : screen.width, 0);
      }

      if (_window.current) {
        returnWindow(_window.current);
        _window.current.onbeforeunload = () => {
          setReady(false);
          setOpen(false);
        };

        copyStyles(document, _window.current.document, extraHeadHTMLTags);

        await new Promise((resolve) => setTimeout(resolve, 300)); // Small delay to ensure styles are applied
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
      closePopup();
    };
  }, [open, preparePopup, closePopup]);

  // Render children inside the new window when ready
  if (open && ready && _window.current) {
    return createPortal(
      <div className="relative">
        {showCloseWindowIcon && (
          <span
            className="absolute top-0 right-0 p-2 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <img
              src={windowCloseIcon}
              alt="Close"
              width={closeWindowIconConfig?.width || 30}
              height={closeWindowIconConfig?.height || 30}
            />
          </span>
        )}
        {children}
      </div>,
      _window.current.document.body // Attach to the new window's body
    );
  }

  // Return the children inside the main window when not hiding them on close
  if (showChilderWhenClose) {
    return (
      <div className="relative">
        {showOpenWindowIcon && (
          <span
            className="absolute top-0 right-0 p-2 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <img
              src={windowOpenIcon}
              alt="Open"
              width={openWindowIconConfig?.width || 30}
              height={openWindowIconConfig?.height || 30}
            />
          </span>
        )}
        {children}
      </div>
    );
  }

  // If the children should be hidden when the popup is closed
  return null;
};

export default RenderInWindow;
