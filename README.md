# react-window-renderer

Introducing a new feature in React that allows developers to render part of a component in a new browser tab or window. This functionality is particularly useful for displaying large content across two related windows, enhancing the user experience when working with dual screens in extended mode. Ideal for scenarios where users need to view or interact with content simultaneously across multiple screens.

## Installation

```sh
npm i react react-window-renderer
```

## Examples

### example with tialwind css styling

```js
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
```

### example with no style

```js
import React from "react";
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
```

## Props Table for `RenderInWindow` Component

| Prop                   | Default Value | Required/Optional | Explanation                                                                                                                         |
| ---------------------- | ------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `open`                 | -             | Required          | Controls whether the window is currently open or closed. A boolean value indicating the state.                                      |
| `setOpen`              | -             | Required          | A React state setter function used to toggle the window's open state. This function updates the `open` prop.                        |
| `children`             | -             | Required          | The JSX Element(s) that will be rendered inside the new window. Must be provided for the component to function.                     |
| `returnWindow`         | -             | Required          | A callback function that receives the newly opened window object, allowing further manipulation if needed.                          |
| `hideChilderWhenClose` | `false`       | Optional          | If set to `true`, the children will be hidden when the window is closed, ensuring they are not displayed in the original component. |
| `showOpenWindowIcon`   | `false`       | Optional          | If set to `true`, an icon will be displayed to indicate the option to open the window. Useful for improving user experience.        |
| `showCloseWindowIcon`  | `false`       | Optional          | If set to `true`, an icon will be shown to allow the user to close the window. Enhances usability by providing a visual cue.        |

## License

MIT
