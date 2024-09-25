export interface IRenderInWindow {
  open: boolean;
  /** The react state to control toggling the window */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /** Children is JSX Element/s to rendered in the Window */
  children: JSX.Element | JSX.Element[];

  /** The returned window object */
  returnWindow: (w: Window | null) => void;

  /** To hide the childern when the window is closed @default false  */
  hideChilderWhenClose?: boolean;

  /** To show an icon to open the window @default false  */
  showOpenWindowIcon?: boolean;

  /** To show an icon to close the window @default false  */
  showCloseWindowIcon?: boolean;

  /** To enable the window feature on dual screen in extend-mode only @default false  if true it will return childern */
  extentedOnly?: boolean;

}
