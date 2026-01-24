import { select, input, number, confirm } from "@inquirer/prompts";
import {
  getWindows,
  newWindow,
  closeWindow,
  focusWindow,
  getTabs,
  getActiveTab,
  newTab,
  closeTab,
  setActiveTab,
  executeCommand,
  executeInActiveTab,
  getCurrentDirectory,
  getProcesses,
  isBusy,
  getContents,
  getSelectedText,
  clear,
  getSettings,
  setProfile,
  type TerminalWindow,
  type TerminalTab,
} from "../src/terminal";

export async function handleTerminalMenu() {
  while (true) {
    const choice = await select({
      message: "Terminal Options:",
      choices: [
        { name: "Windows", value: "windows" },
        { name: "Tabs", value: "tabs" },
        { name: "Commands", value: "commands" },
        { name: "Session Info", value: "session" },
        { name: "Properties", value: "properties" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "windows") await handleWindowsMenu();
    if (choice === "tabs") await handleTabsMenu();
    if (choice === "commands") await handleCommandsMenu();
    if (choice === "session") await handleSessionMenu();
    if (choice === "properties") await handlePropertiesMenu();
  }
}

async function handleWindowsMenu() {
  while (true) {
    const choice = await select({
      message: "Terminal Windows:",
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
      console.log("\n--- Terminal Windows ---");
      windows.forEach((win) => {
        console.log(`Window ${win.index}:`);
        console.log(`  Name: ${win.name}`);
        console.log(`  Tabs: ${win.tabCount}`);
        console.log(`  Visible: ${win.visible}`);
      });
      console.log("");
    }

    if (choice === "new") {
      console.log("\nCreating new window...");
      newWindow();
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

async function handleTabsMenu() {
  while (true) {
    const choice = await select({
      message: "Terminal Tabs:",
      choices: [
        { name: "List Tabs", value: "list" },
        { name: "Get Active Tab", value: "active" },
        { name: "New Tab", value: "new" },
        { name: "Set Active Tab", value: "set_active" },
        { name: "Close Tab", value: "close" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "list") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      console.log("\nFetching tabs...");
      const tabs = getTabs(windowIndex || 1);
      console.log("\n--- Tabs ---");
      tabs.forEach((tab) => {
        console.log(`Tab ${tab.index}:`);
        console.log(`  Processes: ${tab.processes}`);
        console.log(`  TTY: ${tab.tty}`);
        console.log(`  Selected: ${tab.selected}`);
      });
      console.log("");
    }

    if (choice === "active") {
      console.log("\nFetching active tab...");
      const tab = getActiveTab();
      console.log(`\n--- Active Tab ---`);
      console.log(`Index: ${tab.index}`);
      console.log(`Processes: ${tab.processes}`);
      console.log(`TTY: ${tab.tty}`);
      console.log(`Selected: ${tab.selected}\n`);
    }

    if (choice === "new") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const command = await input({
        message: "Initial command (optional):",
      });
      console.log("\nCreating new tab...");
      newTab(windowIndex || 1, command || undefined);
      console.log("New tab created!\n");
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
  }
}

async function handleCommandsMenu() {
  while (true) {
    const choice = await select({
      message: "Terminal Commands:",
      choices: [
        { name: "Execute in Active Tab", value: "execute_active" },
        { name: "Execute in Specific Tab", value: "execute" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "execute_active") {
      const command = await input({
        message: "Enter command:",
        validate: (val) => (val.length > 0 ? true : "Command required"),
      });
      console.log("\nExecuting command...");
      executeInActiveTab(command);
      console.log("Command executed!\n");
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
      const command = await input({
        message: "Enter command:",
        validate: (val) => (val.length > 0 ? true : "Command required"),
      });
      console.log("\nExecuting command...");
      executeCommand(windowIndex || 1, tabIndex || 1, command);
      console.log("Command executed!\n");
    }
  }
}

async function handleSessionMenu() {
  while (true) {
    const choice = await select({
      message: "Terminal Session:",
      choices: [
        { name: "Get Current Directory", value: "pwd" },
        { name: "Get Processes", value: "processes" },
        { name: "Check if Busy", value: "busy" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "pwd") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nFetching current directory...");
      const dir = getCurrentDirectory(windowIndex || 1, tabIndex || 1);
      console.log(`\nCurrent Directory: ${dir}\n`);
    }

    if (choice === "processes") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nFetching processes...");
      const processes = getProcesses(windowIndex || 1, tabIndex || 1);
      console.log(`\nProcesses: ${processes}\n`);
    }

    if (choice === "busy") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nChecking if busy...");
      const busy = isBusy(windowIndex || 1, tabIndex || 1);
      console.log(`\nBusy: ${busy ? "Yes" : "No"}\n`);
    }
  }
}

async function handlePropertiesMenu() {
  while (true) {
    const choice = await select({
      message: "Terminal Properties:",
      choices: [
        { name: "Get Contents", value: "contents" },
        { name: "Get Selected Text", value: "selected" },
        { name: "Clear Terminal", value: "clear" },
        { name: "Get Settings", value: "settings" },
        { name: "Set Profile", value: "profile" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "contents") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nFetching contents...");
      const contents = getContents(windowIndex || 1, tabIndex || 1);
      console.log(`\n--- Terminal Contents (first 500 chars) ---\n${contents.substring(0, 500)}...\n`);
    }

    if (choice === "selected") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nFetching selected text...");
      const text = getSelectedText(windowIndex || 1, tabIndex || 1);
      console.log(`\nSelected Text: ${text}\n`);
    }

    if (choice === "clear") {
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nClearing terminal...");
      clear(windowIndex || 1, tabIndex || 1);
      console.log("Terminal cleared!\n");
    }

    if (choice === "settings") {
      console.log("\nFetching settings...");
      const settings = getSettings();
      console.log("\n--- Terminal Settings ---");
      console.log(`Default Settings: ${settings.defaultSettings}`);
      console.log(`Startup Settings: ${settings.startupSettings}\n`);
    }

    if (choice === "profile") {
      const profileName = await input({
        message: "Profile name:",
        validate: (val) => (val.length > 0 ? true : "Profile name required"),
      });
      const windowIndex = await number({
        message: "Window number:",
        default: 1,
      });
      const tabIndex = await number({
        message: "Tab number:",
        default: 1,
      });
      console.log("\nSetting profile...");
      setProfile(windowIndex || 1, tabIndex || 1, profileName);
      console.log("Profile set!\n");
    }
  }
}
