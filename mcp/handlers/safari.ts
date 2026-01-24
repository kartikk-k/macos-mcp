import {
  getAllTabs as safariGetAllTabs,
  getActiveTab as safariGetActiveTab,
  openUrl as safariOpenUrl,
  closeTab as safariCloseTab,
  closeActiveTab as safariCloseActiveTab,
  setActiveTab as safariSetActiveTab,
  reloadTab as safariReloadTab,
  reloadActiveTab as safariReloadActiveTab,
  getWindows as safariGetWindows,
  newWindow as safariNewWindow,
  closeWindow as safariCloseWindow,
  focusWindow as safariFocusWindow,
  goBack as safariGoBack,
  goForward as safariGoForward,
  goBackActiveTab as safariGoBackActiveTab,
  goForwardActiveTab as safariGoForwardActiveTab,
  executeJavaScript as safariExecuteJavaScript,
  executeJavaScriptInActiveTab as safariExecuteJavaScriptInActiveTab,
  getPageSource as safariGetPageSource,
  getPageText as safariGetPageText,
  getPageTitle as safariGetPageTitle,
  getCurrentUrl as safariGetCurrentUrl,
  clickElement as safariClickElement,
  fillInput as safariFillInput,
  scrollTo as safariScrollTo,
  scrollToBottom as safariScrollToBottom,
  scrollToTop as safariScrollToTop,
  navigateToUrl as safariNavigateToUrl,
  searchWeb,
  showBookmarks,
} from "../../src/safari";

export function handleSafariTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "safari_get_all_tabs":
      return safariGetAllTabs();
    case "safari_get_active_tab":
      return safariGetActiveTab();
    case "safari_open_url":
      return {
        success: safariOpenUrl(
          (args as { url: string; newTab?: boolean }).url,
          (args as { url: string; newTab?: boolean }).newTab ?? true
        ),
      };
    case "safari_close_tab":
      return {
        success: safariCloseTab(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "safari_close_active_tab":
      return { success: safariCloseActiveTab() };
    case "safari_set_active_tab":
      return {
        success: safariSetActiveTab(
          (args as { windowIndex: number; tabIndex: number }).windowIndex,
          (args as { windowIndex: number; tabIndex: number }).tabIndex
        ),
      };
    case "safari_reload_tab":
      return {
        success: safariReloadTab(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "safari_reload_active_tab":
      return { success: safariReloadActiveTab() };
    case "safari_get_windows":
      return safariGetWindows();
    case "safari_new_window":
      return {
        success: safariNewWindow((args as { url?: string }).url),
      };
    case "safari_close_window":
      return {
        success: safariCloseWindow(
          (args as { windowIndex?: number }).windowIndex ?? 1
        ),
      };
    case "safari_focus_window":
      return {
        success: safariFocusWindow(
          (args as { windowIndex?: number }).windowIndex ?? 1
        ),
      };
    case "safari_go_back":
      return {
        success: safariGoBack(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "safari_go_forward":
      return {
        success: safariGoForward(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "safari_execute_javascript": {
      const safariJsArgs = args as {
        javascript: string;
        windowIndex?: number;
        tabIndex?: number;
      };
      return {
        result: safariExecuteJavaScript(
          safariJsArgs.javascript,
          safariJsArgs.windowIndex ?? 1,
          safariJsArgs.tabIndex ?? 1
        ),
      };
    }
    case "safari_get_page_text":
      return { text: safariGetPageText() };
    case "safari_get_page_title":
      return { title: safariGetPageTitle() };
    case "safari_get_page_source":
      return { source: safariGetPageSource() };
    case "safari_get_current_url":
      return { url: safariGetCurrentUrl() };
    case "safari_click_element":
      return {
        result: safariClickElement((args as { selector: string }).selector),
      };
    case "safari_fill_input":
      return {
        result: safariFillInput(
          (args as { selector: string; value: string }).selector,
          (args as { selector: string; value: string }).value
        ),
      };
    case "safari_scroll": {
      const safariScrollArgs = args as {
        direction: "top" | "bottom" | "position";
        x?: number;
        y?: number;
      };
      if (safariScrollArgs.direction === "top") {
        return { result: safariScrollToTop() };
      } else if (safariScrollArgs.direction === "bottom") {
        return { result: safariScrollToBottom() };
      } else {
        return {
          result: safariScrollTo(
            safariScrollArgs.x ?? 0,
            safariScrollArgs.y ?? 0
          ),
        };
      }
    }
    case "safari_navigate_to_url":
      return { success: safariNavigateToUrl((args as { url: string }).url) };
    case "safari_search_web":
      return { success: searchWeb((args as { query: string }).query) };
    case "safari_show_bookmarks":
      return { success: showBookmarks() };
    default:
      throw new Error(`Unknown safari tool: ${name}`);
  }
}
