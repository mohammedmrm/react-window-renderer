import { RenderInWindow, useRenderInWindow } from "react-window-renderer";

const BasicUsageExample = () => {
  const { open, setOpen, _window } = useRenderInWindow();

  return (
    <div className="flex flex-col grow justify-center content-center place-items-center">
      <div className="w-full text-center m-10 text-3xl">
        React Window Renderer Basic Example
      </div>
      <div className="flex flex-col">
        <RenderInWindow
          open={open}
          setOpen={setOpen}
          returnWindow={(w) => (_window.current = w)}
          showChilderWhenClose
        >
          <div className="text-green-700 text-3xl flex justify-center">
            Render this content in new window
          </div>
        </RenderInWindow>
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 rounded shadow m-2  text-gray-100 p-2"
        >
          {open ? "Close Window" : "Open Window"}
        </button>
      </div>
    </div>
  );
};

export default BasicUsageExample;
