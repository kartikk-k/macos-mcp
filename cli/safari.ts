import { select, input, number, confirm } from "@inquirer/prompts";
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
  focusWindow,
  goBack,
  goForward,
  goBackActiveTab,
  goForwardActiveTab,
  executeJavaScript,
  executeJavaScriptInActiveTab,
  getPageSource,
  getPageText,
  getPageTitle,
  getCurrentUrl,
  scrollToBottom,
  scrollToTop,
  navigateToUrl,
  searchWeb,
  showBookmarks,
  type Tab,
} from "../src/safari";

export async function handleSafariMenu() {
  while (true) {
    const choice = await select({
      message: "Safari Options:",
      choices: [
        { name: "Tabs", value: "tabs" },
        { name: "Windows", value: "windows" },
        { name: "Navigation", value: "navigation" },
        { name: "Page Actions", value: "page" },
        { name: "JavaScript", value: "javascript" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "tabs") await handleTabsMenu();
    if (choice === "windows") await handleWindowsMenu();
    if (choice === "navigation") await handleNavigationMenu();
    if (choice === "page") await handlePageMenu();
    if (choice === "javascript") await handleJavaScriptMenu();
  }
}

async function handleTabsMenu() {
  while (true) {
    const choice = await select({
      message: "Safari Tabs:",
      choices: [
        { name: "List All Tabs", value: "list" },
        { name: "Get Active Tab", value: "active" },
        { name: "Open URL", value: "open" },
        { name: "Set Active Tab", value: "set_active" },
        { name: "Reload Tab", value: "reload" },
        { name: "Reload Active Tab", value: "reload_active" },
        { name: "Close Tab", value: "close" },
        { name: "Close Active Tab", value: "close_active" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "list") {
      console.log("\nFetching tabs...");
      const tabs = getAllTabs();
      console.log("\n--- All Tabs ---");
      tabs.forEach((tab) => {
        console.log(`Window ${tab.windowIndex}, Tab ${tab.tabIndex}: ${tab.name}`);
        console.log(`  URL: ${tab.url}`);
      });
      console.log("");
    }

    if (choice === "active") {
      console.log("\nFetching active tab...");
      const tab = getActiveTab();
      console.log(`\n--- Active Tab ---`);
      console.log(`Title: ${tab.name}`);
      console.log(`URL: ${tab.url}`);
      console.log(`Window: ${tab.windowIndex}, Tab: ${tab.tabIndex}\n`);
    }

    if (choice === "open") {
      const url = await input({
        message: "Enter URL:",
        validate: (val) => (val.length > 0 ? true : "URL required"),
      });
      console.log("\nOpening URL...");
      openUrl(url);
      console.log("URL opened!\n");
    }

    if (choice === "set_active") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nSetting active tab...");
      setActiveTab(windowIndex || 1, tabIndex || 1);
      console.log("Tab activated!\n");
    }

    if (choice === "reload") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nReloading tab...");
      reloadTab(windowIndex || 1, tabIndex || 1);
      console.log("Tab reloaded!\n");
    }

    if (choice === "reload_active") {
      console.log("\nReloading active tab...");
      reloadActiveTab();
      console.log("Active tab reloaded!\n");
    }

    if (choice === "close") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      const confirmClose = await confirm({
        message: `Close tab ${tabIndex} in window ${windowIndex}?`,
        default: false,
      });
      if (confirmClose) {
        console.log("\nClosing tab...");
        closeTab(windowIndex || 1, tabIndex || 1);
        console.log("Tab closed!\n");
      }
    }

    if (choice === "close_active") {
      const confirmClose = await confirm({
        message: "Close active tab?",
        default: false,
      });
      if (confirmClose) {
        console.log("\nClosing active tab...");
        closeActiveTab();
        console.log("Active tab closed!\n");
      }
    }
  }
}

async function handleWindowsMenu() {
  while (true) {
    const choice = await select({
      message: "Safari Windows:",
      choices: [
        { name: "List Windows", value: "list" },
        { name: "New Window", value: "new" },
        { name: "Focus Window", value: "focus" },
        { name: "Close Window", value: "close" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "list") {
      console.log("\nFetching windows...");
      const windows = getWindows();
      console.log("\n--- Safari Windows ---");
      windows.forEach((win) => {
        console.log(`Window ${win.index}:`);
        console.log(`  Current Tab: ${win.currentTab.name}`);
        console.log(`  URL: ${win.currentTab.url}`);
        console.log(`  Total Tabs: ${win.tabs.length}`);
      });
      console.log("");
    }

    if (choice === "new") {
      const url = await input({
        message: "Enter URL (optional):",
      });
      console.log("\nCreating new window...");
      newWindow(url || undefined);
      console.log("New window created!\n");
    }

    if (choice === "focus") {
      const windowIndex = await number({
        message: "Window number to focus:",
        default: 1,
      });
      console.log("\nFocusing window...");
      focusWindow(windowIndex || 1);
      console.log("Window focused!\n");
    }

    if (choice === "close") {
      const windowIndex = await number({
        message: "Window number to close:",
        default: 1,
      });
      const confirmClose = await confirm({
        message: `Close window ${windowIndex}?`,
        default: false,
      });
      if (confirmClose) {
        console.log("\nClosing window...");
        closeWindow(windowIndex || 1);
        console.log("Window closed!\n");
      }
    }
  }
}

async function handleNavigationMenu() {
  while (true) {
    const choice = await select({
      message: "Safari Navigation:",
      choices: [
        { name: "Back (Active Tab)", value: "back_active" },
        { name: "Forward (Active Tab)", value: "forward_active" },
        { name: "Back (Specific Tab)", value: "back" },
        { name: "Forward (Specific Tab)", value: "forward" },
        { name: "Navigate to URL", value: "navigate" },
        { name: "Search Web", value: "search" },
        { name: "Show Bookmarks", value: "bookmarks" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "back_active") {
      console.log("\nGoing back...");
      goBackActiveTab();
      console.log("Navigated back!\n");
    }

    if (choice === "forward_active") {
      console.log("\nGoing forward...");
      goForwardActiveTab();
      console.log("Navigated forward!\n");
    }

    if (choice === "back") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nGoing back...");
      goBack(windowIndex || 1, tabIndex || 1);
      console.log("Navigated back!\n");
    }

    if (choice === "forward") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nGoing forward...");
      goForward(windowIndex || 1, tabIndex || 1);
      console.log("Navigated forward!\n");
    }

    if (choice === "navigate") {
      const url = await input({
        message: "Enter URL:",
        validate: (val) => (val.length > 0 ? true : "URL required"),
      });
      console.log("\nNavigating...");
      navigateToUrl(url);
      console.log("Navigated to URL!\n");
    }

    if (choice === "search") {
      const query = await input({
        message: "Search query:",
        validate: (val) => (val.length > 0 ? true : "Query required"),
      });
      console.log("\nSearching...");
      searchWeb(query);
      console.log("Search performed!\n");
    }

    if (choice === "bookmarks") {
      console.log("\nShowing bookmarks...");
      showBookmarks();
      console.log("Bookmarks displayed!\n");
    }
  }
}

async function handlePageMenu() {
  while (true) {
    const choice = await select({
      message: "Safari Page Actions:",
      choices: [
        { name: "Get Page Title", value: "title" },
        { name: "Get Current URL", value: "url" },
        { name: "Get Page Text", value: "text" },
        { name: "Get Page Source", value: "source" },
        { name: "Scroll to Top", value: "scroll_top" },
        { name: "Scroll to Bottom", value: "scroll_bottom" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "title") {
      console.log("\nFetching page title...");
      const title = getPageTitle();
      console.log(`\nPage Title: ${title}\n`);
    }

    if (choice === "url") {
      console.log("\nFetching current URL...");
      const url = getCurrentUrl();
      console.log(`\nCurrent URL: ${url}\n`);
    }

    if (choice === "text") {
      console.log("\nFetching page text...");
      const text = getPageText();
      console.log(`\n--- Page Text ---\n${text}\n`);
    }

    if (choice === "source") {
      console.log("\nFetching page source...");
      const source = getPageSource();
      console.log(`\n--- Page Source (first 500 chars) ---\n${source.substring(0, 500)}...\n`);
    }

    if (choice === "scroll_top") {
      console.log("\nScrolling to top...");
      scrollToTop();
      console.log("Scrolled to top!\n");
    }

    if (choice === "scroll_bottom") {
      console.log("\nScrolling to bottom...");
      scrollToBottom();
      console.log("Scrolled to bottom!\n");
    }
  }
}

async function handleJavaScriptMenu() {
  while (true) {
    const choice = await select({
      message: "Safari JavaScript:",
      choices: [
        { name: "Execute in Active Tab", value: "execute_active" },
        { name: "Execute in Specific Tab", value: "execute" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "execute_active") {
      const script = await input({
        message: "Enter JavaScript code:",
        validate: (val) => (val.length > 0 ? true : "Code required"),
      });
      console.log("\nExecuting JavaScript...");
      const result = executeJavaScriptInActiveTab(script);
      console.log(`\nResult: ${result}\n`);
    }

    if (choice === "execute") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      const script = await input({
        message: "Enter JavaScript code:",
        validate: (val) => (val.length > 0 ? true : "Code required"),
      });
      console.log("\nExecuting JavaScript...");
      const result = executeJavaScript(windowIndex || 1, tabIndex || 1, script);
      console.log(`\nResult: ${result}\n`);
    }
  }
}
