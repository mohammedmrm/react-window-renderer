import { RenderInWindow, useRenderInWindow } from "react-window-renderer";

const BasicNoCssUsageExample = () => {
  const { open, setOpen, _window } = useRenderInWindow();

  return (
    <>
      <div>React Window Renderer Basic Example</div>
      <RenderInWindow
        open={open}
        setOpen={setOpen}
        showCloseWindowIcon
        showOpenWindowIcon
        returnWindow={(w) => (_window.current = w)}
        extraHeadHTMLTags={[<style ref="" />]}
      >
        <div>Render this content in new window</div>
      </RenderInWindow>
    </>
  );
};

export default BasicNoCssUsageExample;
