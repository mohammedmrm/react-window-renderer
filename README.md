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

| Prop                    | Default Value                                                | Required/Optional          | Explanation                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`                  | -                                                            | Required                   | Controls whether the window is currently open or closed. A boolean value indicating the state.                                                    |
| `setOpen`               | -                                                            | Required                   | A React state setter function used to toggle the window's open state. This function updates the `open` prop.                                      |
| `children`              | -                                                            | Required                   | The JSX Element(s) that will be rendered inside the new window. Must be provided for the component to function.                                   |
| `returnWindow`          | -                                                            | Required                   | A callback function that receives the newly opened window object, allowing further manipulation if needed.                                        |
| `hideChilderWhenClose`  | `false`                                                      | Optional                   | If `true`, the children will be hidden when the window is closed, ensuring they are not displayed in the original component.                      |
| `showOpenWindowIcon`    | `false`                                                      | Optional                   | If `true`, an icon will be displayed to indicate the option to open the window. Useful for improving user experience.                             |
| `openWindowIconConfig`  | [see `IIconConfig`](#props-table-for-iiconconfig-object)     | Optional                   | Configuration for the open window icon, allowing you to set width and height. Defaults to 30px by 30px.                                           |
| `showCloseWindowIcon`   | `false`                                                      | Optional                   | If `true`, an icon will be shown to allow the user to close the window. Enhances usability by providing a visual cue.                             |
| `closeWindowIconConfig` | [see `IIconConfig`](#props-table-for-iiconconfig-object)     | Optional                   | Configuration for the close window icon, allowing you to set width and height. Defaults to 30px by 30px.                                          |
| `windowConfig`          | [see `IWindowConfig`](#props-table-for-iwindowconfig-object) | Optional                   | Configuration object for the window's properties such as width, height, position, and other window features (toolbar, menubar, etc.).             |
| `extraHeadHTMLTags`     | -                                                            | Optional, **Experimental** | An array of JSX elements (e.g. `<style>` or `<script>`) that will be injected into the window's head section. Experimental and subject to change. |

---

### Props Table for `IWindowConfig` Object

| Prop         | Default Value         | Required/Optional | Explanation                                                                                                          |
| ------------ | --------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `url`        | `undefined`           | Optional          | URL of the window.                                                                                                   |
| `left`       | `0` or `screen.width` | Optional          | The distance from the left of the screen to the window. Defaults to the full screen width or 0 if `popup` is `true`. |
| `top`        | `0`                   | Optional          | The distance from the top of the screen to the window. Defaults to 0.                                                |
| `height`     | `screen.height`       | Optional          | The height of the window. Defaults to the full screen height.                                                        |
| `width`      | `screen.width`        | Optional          | The width of the window. Defaults to the full screen width.                                                          |
| `menubar`    | `"no"`                | Optional          | Enables or disables the menubar in the window.                                                                       |
| `toolbar`    | `"no"`                | Optional          | Enables or disables the toolbar in the window.                                                                       |
| `location`   | `"no"`                | Optional          | Enables or disables the location bar in the window.                                                                  |
| `status`     | `"no"`                | Optional          | Enables or disables the status bar in the window.                                                                    |
| `resizable`  | `"yes"`               | Optional          | Enables or disables the window resizing feature.                                                                     |
| `scrollbars` | `"no"`                | Optional          | Enables or disables scrollbars in the window.                                                                        |
| `popup`      | `true`                | Optional          | Determines if the window should be rendered as a popup. If `false`, it will render in a new tab.                     |

---

### Props Table for `IIconConfig` Object

| Prop     | Default Value | Required/Optional | Explanation                       |
| -------- | ------------- | ----------------- | --------------------------------- |
| `width`  | `30`          | Optional          | The width of the icon in pixels.  |
| `height` | `30`          | Optional          | The height of the icon in pixels. |

## License

MIT

## Author

Mohammed Ridha. M. M.
