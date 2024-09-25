/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
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
  hideChilderWhenClose,
  showOpenWindowIcon,
  showCloseWindowIcon,
  extraHeadHTMLTags,
  windowConfig,
  closeWindowIconConfig,
  openWindowIconConfig,
}: IRenderInWindow) => {
  const _window = React.useRef<Window | null>(null);
  const isExtended = React.useRef<boolean>();
  const [ready, setReady] = React.useState(false);
  const preparePopup = React.useCallback(async () => {
    let curWindow: Window;

    if (open) {
      // get screen details on chrome browser
      // read here https://developer.chrome.com/docs/capabilities/web-apis/window-management
      if ("getScreenDetails" in window) {
        //@ts-ignore
        const screenDetails = await window.getScreenDetails();
        const currentScreen = screenDetails.currentScreen;
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
        //@ts-ignore
        const screenDetails = await window.getScreens();
        const currentScreen = screenDetails.currentScreen;
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
        _window.current = createPopup({
          ...windowConfig,
          //@ts-ignore
          left: windowConfig?.left || screen.left > 0 ? 0 : screen.width,
          width: windowConfig?.width || screen.width,
          height: windowConfig?.height || screen.height,
        });
        //@ts-ignore
        _window.current?.moveTo(screen.left > 0 ? 0 : screen.width, 0);

        console.log(screen);
        console.log(window);
      }

      if (_window.current) {
        // Save reference to window for cleanup
        curWindow = _window.current;
        returnWindow(curWindow);
        curWindow.onbeforeunload = () => {
          setReady(false);
          setOpen(false);
        };

        // Delay rendering until styles are ready
        copyStyles(
          window.document,
          _window.current.document,
          extraHeadHTMLTags
        );
        await new Promise((r) => setTimeout(r, 500)); // Adjust the delay as needed
        setReady(true);
      } else {
        console.log("window not ready");
      }
    } else {
      if (_window.current) {
        _window.current.close();
        //returnWindow(null)
      }
      setReady(false);
    }
  }, [extraHeadHTMLTags, open, returnWindow, setOpen, windowConfig]);
  React.useEffect(() => {
    // If open, create window and store in ref
    preparePopup();
    return () => {
      returnWindow(_window.current);
    };
  }, [open, preparePopup, returnWindow]);

  if (open && ready && _window.current) {
    return createPortal(
      <div className="relative">
        {showCloseWindowIcon && (
          <span
            className="absolute top-0 right-0 p-2 text-slate-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={windowCloseIcon}
              alt="Window Open Icon"
              width={closeWindowIconConfig?.width || 30}
              height={closeWindowIconConfig?.height || 30}
            />{" "}
          </span>
        )}
        {children}
      </div>,
      _window.current.document.body,
      "x"
    );
  }
  if (!hideChilderWhenClose)
    return (
      <div className="relative">
        {showOpenWindowIcon && (
          <span
            className="absolute top-0 right-0 p-2 text-slate-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={windowOpenIcon}
              alt="Window Open Icon"
              width={openWindowIconConfig?.width || 30}
              height={openWindowIconConfig?.height || 30}
            />
          </span>
        )}
        {children}
      </div>
    );
  return <></>;
};

export default RenderInWindow;
