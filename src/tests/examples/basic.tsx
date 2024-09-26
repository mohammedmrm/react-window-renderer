import { RenderInWindow, useRenderInWindow } from "react-window-renderer";

const BasicUsageExample = () => {
  const { open, setOpen, _window } = useRenderInWindow();

  return (
    <>
      <RenderInWindow
        open={open}
        setOpen={setOpen}
        returnWindow={(w) => (_window.current = w)}
      >
        <div>Render this content in new window</div>
      </RenderInWindow>
      <button onClick={() => setOpen(!open)}>
        {open ? "Close Window" : "Open Window"}
      </button>
    </>
  );
};

export default BasicUsageExample;
