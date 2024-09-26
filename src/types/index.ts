export interface IRenderInWindow {
  open: boolean;
  /** The react state to control toggling the window */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /** Children is JSX Element/s to rendered in the Window */
  children: JSX.Element | JSX.Element[];

  /** The returned window object */
  returnWindow: (w: Window | null) => void;

  /** To show the childern when the window is closed @default false  */
  showChilderWhenClose?: boolean;

  /** To show an icon to open the window @default false  */
  showOpenWindowIcon?: boolean;

  /** set icon width and height @default 30px 30xp */
  openWindowIconConfig?: IIconConfig;

  /** To show an icon to close the window @default false  */
  showCloseWindowIcon?: boolean;

  /** set icon width and height @default 30px 30xp */
  closeWindowIconConfig?: IIconConfig;

  /** configration for the window props (ex. widht height ....) */
  windowConfig?: IWindowConfig;

  /** To included any other needed css/js files for third-party libs
   * @experimental This parameter is experimental and may change in future releases.
   */
  extraHeadHTMLTags?: React.ReactNode[];
}

export interface IWindowConfig {
  /** URL of the window @default undefined  */
  url?: string | URL;

  /** Title of the window @default undefined  */
  windowName?: string;

  /**  Distance from left  @default screen.width or 0 */
  left?: number;

  /** Distance from top  @default  0 */
  top?: number;

  /** window height @default screen.height */
  height?: number;

  /** window widht @default screen.width */
  width?: number;

  menubar?: "no" | "yes";
  toolbar?: "no" | "yes";
  location?: "no" | "yes";
  status?: "no" | "yes";
  resizable?: "no" | "yes";
  scrollbars?: "no" | "yes";

  /** will render in new window @default true if false it will render in new tap */
  popup?: boolean;
}

export interface IIconConfig {
  width?: number;
  height?: number;
}
