export {
  getAllTabs,
  getActiveTab,
  openUrl,
  closeTab,
  closeActiveTab,
  setActiveTab,
  reloadTab,
  reloadActiveTab,
  type Tab,
} from "./tabs";
export {
  getWindows,
  newWindow,
  closeWindow,
  focusWindow,
  type ChromeWindow,
} from "./windows";
export {
  goBack,
  goForward,
  goBackActiveTab,
  goForwardActiveTab,
} from "./navigation";
export {
  executeJavaScript,
  executeJavaScriptInActiveTab,
  getPageSource,
  getPageText,
  getPageTitle,
  clickElement,
  fillInput,
  scrollTo,
  scrollToBottom,
  scrollToTop,
} from "./javascript";
