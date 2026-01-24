import { select, input, confirm } from "@inquirer/prompts";
import {
  getAllTabs,
  getActiveTab,
  openUrl,
  closeActiveTab,
  setActiveTab,
  reloadActiveTab,
  getWindows,
  newWindow,
  closeWindow,
  goBackActiveTab,
  goForwardActiveTab,
  executeJavaScriptInActiveTab,
  getPageTitle,
  getPageText,
  scrollToTop,
  scrollToBottom,
} from "../src/chrome";

export async function handleChromeMenu() {
  while (true) {
    const choice = await select({
      message: "Chrome Options:",
      choices: [
        { name: "List All Tabs", value: "list_tabs" },
        { name: "Get Active Tab", value: "active_tab" },
        { name: "Open URL", value: "open_url" },
        { name: "Switch to Tab", value: "switch_tab" },
        { name: "Close Active Tab", value: "close_tab" },
        { name: "Reload Active Tab", value: "reload" },
        { name: "Go Back", value: "back" },
        { name: "Go Forward", value: "forward" },
        { name: "New Window", value: "new_window" },
        { name: "List Windows", value: "list_windows" },
        { name: "Close Window", value: "close_window" },
        { name: "Get Page Title", value: "page_title" },
        { name: "Get Page Text", value: "page_text" },
        { name: "Execute JavaScript", value: "exec_js" },
        { name: "Scroll Page", value: "scroll" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "list_tabs") {
      console.log("\nFetching tabs...");
      const tabs = getAllTabs();
      if (tabs.length === 0) {
        console.log("No tabs found. Is Chrome running?\n");
      } else {
        console.log(`\n--- ${tabs.length} Tab(s) ---`);
        tabs.forEach((tab) => {
          console.log(`\n[Window ${tab.windowIndex}, Tab ${tab.tabIndex}]`);
          console.log(`  Title: ${tab.title}`);
          console.log(`  URL: ${tab.url}`);
        });
        console.log("");
      }
    }

    if (choice === "active_tab") {
      const tab = getActiveTab();
      if (tab) {
        console.log("\n--- Active Tab ---");
        console.log(`  Title: ${tab.title}`);
        console.log(`  URL: ${tab.url}\n`);
      } else {
        console.log("\nCould not get active tab. Is Chrome running?\n");
      }
    }

    if (choice === "open_url") {
      const url = await input({
        message: "Enter URL:",
        validate: (val) => (val.length > 0 ? true : "URL required"),
      });
      const newTab = await confirm({
        message: "Open in new tab?",
        default: true,
      });
      const success = openUrl(url, newTab);
      console.log(success ? "\nURL opened.\n" : "\nFailed to open URL.\n");
    }

    if (choice === "switch_tab") {
      const tabs = getAllTabs();
      if (tabs.length === 0) {
        console.log("\nNo tabs found.\n");
        continue;
      }

      const tabChoice = await select({
        message: "Select a tab:",
        choices: [
          ...tabs.map((t) => ({
            name: `[W${t.windowIndex}:T${t.tabIndex}] ${t.title.substring(0, 50)}`,
            value: `${t.windowIndex}:${t.tabIndex}`,
          })),
          { name: "< Back", value: "__back__" },
        ],
      });

      if (tabChoice === "__back__") continue;

      const [winIdx, tabIdx] = tabChoice.split(":").map(Number);
      const success = setActiveTab(winIdx, tabIdx);
      console.log(success ? "\nSwitched to tab.\n" : "\nFailed to switch tab.\n");
    }

    if (choice === "close_tab") {
      const confirmed = await confirm({
        message: "Close the active tab?",
        default: false,
      });
      if (confirmed) {
        const success = closeActiveTab();
        console.log(success ? "\nTab closed.\n" : "\nFailed to close tab.\n");
      }
    }

    if (choice === "reload") {
      const success = reloadActiveTab();
      console.log(success ? "\nReloading...\n" : "\nFailed to reload.\n");
    }

    if (choice === "back") {
      const success = goBackActiveTab();
      console.log(success ? "\nWent back.\n" : "\nFailed to go back.\n");
    }

    if (choice === "forward") {
      const success = goForwardActiveTab();
      console.log(success ? "\nWent forward.\n" : "\nFailed to go forward.\n");
    }

    if (choice === "new_window") {
      const url = await input({
        message: "Enter URL (leave empty for blank):",
      });
      const incognito = await confirm({
        message: "Incognito mode?",
        default: false,
      });
      const success = newWindow(url || undefined, incognito);
      console.log(success ? "\nNew window opened.\n" : "\nFailed to open window.\n");
    }

    if (choice === "list_windows") {
      const windows = getWindows();
      if (windows.length === 0) {
        console.log("\nNo windows found.\n");
      } else {
        console.log(`\n--- ${windows.length} Window(s) ---`);
        windows.forEach((w) => {
          console.log(`\nWindow ${w.index}:`);
          console.log(`  Tabs: ${w.tabCount}`);
          console.log(`  Active Tab: ${w.activeTabIndex}`);
          console.log(`  Mode: ${w.mode}`);
        });
        console.log("");
      }
    }

    if (choice === "close_window") {
      const windows = getWindows();
      if (windows.length === 0) {
        console.log("\nNo windows found.\n");
        continue;
      }

      const winChoice = await select({
        message: "Select window to close:",
        choices: [
          ...windows.map((w) => ({
            name: `Window ${w.index} (${w.tabCount} tabs, ${w.mode})`,
            value: w.index,
          })),
          { name: "< Back", value: -1 },
        ],
      });

      if (winChoice === -1) continue;

      const confirmed = await confirm({
        message: `Close window ${winChoice}?`,
        default: false,
      });
      if (confirmed) {
        const success = closeWindow(winChoice);
        console.log(success ? "\nWindow closed.\n" : "\nFailed to close window.\n");
      }
    }

    if (choice === "page_title") {
      const title = getPageTitle();
      console.log(`\nPage title: ${title}\n`);
    }

    if (choice === "page_text") {
      console.log("\nFetching page text...");
      const text = getPageText();
      const preview = text.substring(0, 500);
      console.log(`\n--- Page Text (first 500 chars) ---\n${preview}\n`);
    }

    if (choice === "exec_js") {
      const js = await input({
        message: "Enter JavaScript to execute:",
        validate: (val) => (val.length > 0 ? true : "JavaScript required"),
      });
      console.log("\nExecuting...");
      const result = executeJavaScriptInActiveTab(js);
      console.log(`\nResult: ${result}\n`);
    }

    if (choice === "scroll") {
      const scrollChoice = await select({
        message: "Scroll options:",
        choices: [
          { name: "Scroll to Top", value: "top" },
          { name: "Scroll to Bottom", value: "bottom" },
          { name: "< Back", value: "__back__" },
        ],
      });

      if (scrollChoice === "top") {
        scrollToTop();
        console.log("\nScrolled to top.\n");
      }
      if (scrollChoice === "bottom") {
        scrollToBottom();
        console.log("\nScrolled to bottom.\n");
      }
    }
  }
}
