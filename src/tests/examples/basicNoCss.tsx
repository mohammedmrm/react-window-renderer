import { RenderInWindow, useRenderInWindow } from "../../index";

const BasicNoCssUsageExample = () => {
  const { open, setOpen, _window } = useRenderInWindow();

  return (
    <RenderInWindow
      open={open}
      setOpen={setOpen}
      showCloseWindowIcon
      showOpenWindowIcon
      showChilderWhenClose
      returnWindow={(w: Window | null) => (_window.current = w)}
      extraHeadHTMLTags={[<style ref="" />]}
    >
      <div>Render this content in new window</div>
    </RenderInWindow>
  );
};

export default BasicNoCssUsageExample;
