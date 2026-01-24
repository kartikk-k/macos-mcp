import {
  getAllTabs,
  getActiveTab,
  openUrl,
  closeTab,
  closeActiveTab,
  setActiveTab,
  reloadTab,
  reloadActiveTab,
  getWindows,
  newWindow,
  closeWindow,
  goBack,
  goForward,
  goBackActiveTab,
  goForwardActiveTab,
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
} from "../../src/chrome";

export function handleChromeTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "chrome_get_all_tabs":
      return getAllTabs();
    case "chrome_get_active_tab":
      return getActiveTab();
    case "chrome_open_url":
      return {
        success: openUrl(
          (args as { url: string; newTab?: boolean }).url,
          (args as { url: string; newTab?: boolean }).newTab ?? true
        ),
      };
    case "chrome_close_tab":
      return {
        success: closeTab(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "chrome_close_active_tab":
      return { success: closeActiveTab() };
    case "chrome_set_active_tab":
      return {
        success: setActiveTab(
          (args as { windowIndex: number; tabIndex: number }).windowIndex,
          (args as { windowIndex: number; tabIndex: number }).tabIndex
        ),
      };
    case "chrome_reload_tab":
      return {
        success: reloadTab(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "chrome_reload_active_tab":
      return { success: reloadActiveTab() };
    case "chrome_get_windows":
      return getWindows();
    case "chrome_new_window":
      return {
        success: newWindow(
          (args as { url?: string; incognito?: boolean }).url,
          (args as { url?: string; incognito?: boolean }).incognito ?? false
        ),
      };
    case "chrome_close_window":
      return {
        success: closeWindow(
          (args as { windowIndex?: number }).windowIndex ?? 1
        ),
      };
    case "chrome_go_back":
      return {
        success: goBack(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "chrome_go_forward":
      return {
        success: goForward(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "chrome_execute_javascript": {
      const jsArgs = args as {
        javascript: string;
        windowIndex?: number;
        tabIndex?: number;
      };
      return {
        result: executeJavaScript(
          jsArgs.javascript,
          jsArgs.windowIndex ?? 1,
          jsArgs.tabIndex ?? 1
        ),
      };
    }
    case "chrome_get_page_text":
      return { text: getPageText() };
    case "chrome_get_page_title":
      return { title: getPageTitle() };
    case "chrome_get_page_source":
      return { source: getPageSource() };
    case "chrome_click_element":
      return { result: clickElement((args as { selector: string }).selector) };
    case "chrome_fill_input":
      return {
        result: fillInput(
          (args as { selector: string; value: string }).selector,
          (args as { selector: string; value: string }).value
        ),
      };
    case "chrome_scroll": {
      const scrollArgs = args as {
        direction: "top" | "bottom" | "position";
        x?: number;
        y?: number;
      };
      if (scrollArgs.direction === "top") {
        return { result: scrollToTop() };
      } else if (scrollArgs.direction === "bottom") {
        return { result: scrollToBottom() };
      } else {
        return { result: scrollTo(scrollArgs.x ?? 0, scrollArgs.y ?? 0) };
      }
    }
    default:
      throw new Error(`Unknown chrome tool: ${name}`);
  }
}
