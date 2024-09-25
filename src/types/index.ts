export interface IRenderInWindow {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
  showChildreanWhenClosed?: boolean;
  showToggle?: boolean;
  extentedOnly?: boolean;
  returnWindow: (w: Window | null) => void;
}
