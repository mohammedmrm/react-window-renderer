import { useEffect, useRef, useState } from "react";

const useRenderInWindow = () => {
  const [open, setOpen] = useState(false);
  const _window = useRef<Window | null>(null);

  useEffect(() => {
    const handleWindowClose = () => {
      setOpen(false);
    };

    const handleBeforeUnload = () => {
      setOpen(false);
      _window.current?.close();
    };
    const w = _window.current;
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleWindowClose);

    return () => {
      w?.close();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleWindowClose);
    };
  }, []);

  return { open, setOpen, _window };
};

export default useRenderInWindow;
