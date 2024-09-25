import { RenderInWindow } from "./components/RenderInWindow";
import useRenderInWindow from "./hooks/useRenderInWindow";

function App() {
  const { open, setOpen, _window } = useRenderInWindow();
  return (
    <>
      <div>React-window-rebnderer</div>
      <RenderInWindow
        open={open}
        setOpen={setOpen}
        returnWindow={(w) => (_window.current = w)}
      >
        <div>Can you render me in new window</div>
      </RenderInWindow>
    </>
  );
}

export default App;
