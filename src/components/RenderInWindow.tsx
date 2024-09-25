/* eslint-disable @typescript-eslint/ban-ts-comment */
import windowCloseIcon from "@/assets/window-close.svg";
import windowOpenIcon from "@/assets/window-open.svg";
import { copyStyles, createPopup } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const RenderInWindow = ({
  open,
  setOpen,
  children,
  returnWindow,
  showChildreanWhenClosed = true,
  showToggle = true,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
  showChildreanWhenClosed?: boolean;
  showToggle?: boolean;
  extentedOnly?: boolean;
  returnWindow: (w: Window | null) => void;
}) => {
  const _window = useRef<Window | null>(null);
  const isExtended = useRef<boolean>();
  const [ready, setReady] = useState(false);
  const preparePopup = useCallback(async () => {
    let curWindow: Window;

    if (open) {
      // get screen details on chrome browser
      // read here https://developer.chrome.com/docs/capabilities/web-apis/window-management
      if ("getScreenDetails" in window) {
        //@ts-ignore
        const screenDetails = await window.getScreenDetails();
        const currentScreen = screenDetails.currentScreen;
        _window.current = createPopup(
          screen.width,
          screen.height,
          screen.width,
          screen.height
        );
        _window.current?.moveTo(
          currentScreen.isPrimary ? currentScreen.width : 0,
          0
        );
      } else if ("getScreens" in window) {
        //@ts-ignore
        const screenDetails = await window.getScreens();
        const currentScreen = screenDetails.currentScreen;
        isExtended.current = currentScreen.isExtended;
        _window.current = createPopup(
          screen.width,
          screen.height,
          screen.width,
          screen.height
        );
        _window.current?.moveTo(
          currentScreen.isPrimary ? currentScreen.width * 2 : 0,
          0
        );
      } else {
        _window.current = createPopup(
          //@ts-ignore
          screen.left > 0 ? 0 : screen.width,
          5,
          screen.width,
          screen.height
        );
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
        copyStyles(window.document, _window.current.document);
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
  }, [open, returnWindow, setOpen]);
  useEffect(() => {
    // If open, create window and store in ref
    preparePopup();
    return () => {
      returnWindow(_window.current);
    };
  }, [open, preparePopup, returnWindow]);

  if (open && ready && _window.current)
    return createPortal(
      <div className="relative">
        {showToggle && (
          <span
            className="absolute top-0 right-0 p-2 text-slate-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={windowCloseIcon}
              alt="Window Open Icon"
              width="50"
              height="50"
            />{" "}
          </span>
        )}
        {children}
      </div>,
      _window.current.document.body,
      "x"
    );
  if (showChildreanWhenClosed)
    return (
      <div className="relative">
        {showToggle && (
          <span
            className="absolute top-0 right-0 p-2 text-slate-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={windowOpenIcon}
              alt="Window Open Icon"
              width="50"
              height="50"
            />
          </span>
        )}
        {children}
      </div>
    );
  return <></>;
};
