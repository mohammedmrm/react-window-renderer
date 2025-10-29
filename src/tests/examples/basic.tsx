import { RenderInWindow, useRenderInWindow } from "../../index";

const BasicUsageExample = () => {
  const { open, setOpen, _window } = useRenderInWindow();

  return (
    <>
      <RenderInWindow
        open={open}
        setOpen={setOpen}
        returnWindow={(w: Window | null) => (_window.current = w)}
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
