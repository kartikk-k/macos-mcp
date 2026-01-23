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
  type SafariWindow,
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
  getCurrentUrl,
  clickElement,
  fillInput,
  scrollTo,
  scrollToBottom,
  scrollToTop,
  navigateToUrl,
  searchWeb,
  showBookmarks,
} from "./javascript";
