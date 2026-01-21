import { select, input, confirm, number } from "@inquirer/prompts";
import {
  getAccounts,
  getMails,
  composeMail,
  searchMails,
  checkMail,
  getUnreadCount,
  getTotalUnreadCount,
  type SearchField,
} from "./src/mail";
import {
  getVolume,
  setVolume,
  isMuted,
  mute,
  unmute,
  toggleMute,
  beep,
} from "./src/audio";
import {
  openPath,
  revealInFinder,
  createFolder,
  moveToTrash,
  emptyTrash,
  duplicateFile,
  moveFile,
  copyFile,
  renameFile,
  ejectVolume,
  getSelection,
  getCurrentFolder,
  getDesktopPicture,
  setDesktopPicture,
  getFileInfo,
  getDisks,
} from "./src/finder";
import {
  getAllTabs,
  getActiveTab,
  openUrl,
  closeTab,
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
} from "./src/chrome";

function safeGetUnreadCount(): number {
  try {
    return getTotalUnreadCount();
  } catch {
    return 0;
  }
}

function safeGetVolume(): number {
  try {
    return getVolume();
  } catch {
    return -1;
  }
}

function safeIsMuted(): boolean | null {
  try {
    return isMuted();
  } catch {
    return null;
  }
}

async function main() {
  console.log("AppleScript CLI - Navigate with arrow keys\n");

  while (true) {
    const mainChoice = await select({
      message: "What would you like to do?",
      choices: [
        { name: "Mail", value: "mail" },
        { name: "Audio", value: "audio" },
        { name: "Finder", value: "finder" },
        { name: "Chrome", value: "chrome" },
        { name: "Exit", value: "exit" },
      ],
    });

    if (mainChoice === "exit") {
      console.log("Goodbye!");
      break;
    }

    if (mainChoice === "mail") {
      await handleMailMenu();
    }

    if (mainChoice === "audio") {
      await handleAudioMenu();
    }

    if (mainChoice === "finder") {
      await handleFinderMenu();
    }

    if (mainChoice === "chrome") {
      await handleChromeMenu();
    }
  }
}

// ==================== MAIL MENU ====================

async function handleMailMenu() {
  while (true) {
    const totalUnread = safeGetUnreadCount();
    const unreadLabel = totalUnread > 0 ? ` (${totalUnread} unread)` : "";

    const choice = await select({
      message: "Mail Options:",
      choices: [
        { name: "View Mail Accounts", value: "accounts" },
        { name: "Read Emails from Account", value: "emails" },
        { name: "Compose Email", value: "compose" },
        { name: "Search Emails", value: "search" },
        { name: "Check for New Mail", value: "check" },
        { name: `Unread Count${unreadLabel}`, value: "unread" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "accounts") await handleViewAccounts();
    if (choice === "emails") await handleReadEmails();
    if (choice === "compose") await handleCompose();
    if (choice === "search") await handleSearch();
    if (choice === "check") await handleCheckMail();
    if (choice === "unread") await handleUnreadCount();
  }
}

async function handleViewAccounts() {
  console.log("\nFetching accounts...");
  const accounts = getAccounts();
  console.log("\n--- Mail Accounts ---");
  accounts.forEach((acc, i) => {
    console.log(`${i + 1}. ${acc.name} (${acc.email})`);
  });
  console.log("");
}

async function handleReadEmails() {
  console.log("\nFetching accounts...");
  const accounts = getAccounts();

  if (accounts.length === 0) {
    console.log("No mail accounts found.\n");
    return;
  }

  const selectedAccount = await select({
    message: "Select an account to view emails:",
    choices: [
      ...accounts.map((acc) => ({
        name: `${acc.name} (${acc.email})`,
        value: acc.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedAccount === "__back__") return;

  console.log(`\nFetching emails from ${selectedAccount}...`);
  const mails = getMails(selectedAccount, 10);

  if (mails.length === 0) {
    console.log("No emails found in inbox.\n");
    return;
  }

  console.log("\n--- Newest 10 Emails ---");
  mails.forEach((mail) => {
    console.log(`\n#${mail.index}`);
    console.log(`  Subject: ${mail.subject}`);
    console.log(`  From: ${mail.sender}`);
    console.log(`  Date: ${mail.dateReceived}`);
  });
  console.log("");
}

async function handleCompose() {
  const to = await input({
    message: "To (comma-separated for multiple):",
    validate: (val) => (val.length > 0 ? true : "At least one recipient required"),
  });

  const cc = await input({
    message: "CC (optional, comma-separated):",
  });

  const bcc = await input({
    message: "BCC (optional, comma-separated):",
  });

  const subject = await input({
    message: "Subject:",
  });

  const body = await input({
    message: "Body:",
  });

  const sendNow = await confirm({
    message: "Send immediately?",
    default: false,
  });

  const toAddresses = to.split(",").map((s) => s.trim()).filter(Boolean);
  const ccAddresses = cc ? cc.split(",").map((s) => s.trim()).filter(Boolean) : undefined;
  const bccAddresses = bcc ? bcc.split(",").map((s) => s.trim()).filter(Boolean) : undefined;

  console.log("\nPreparing email...");
  const success = composeMail({
    to: toAddresses,
    cc: ccAddresses,
    bcc: bccAddresses,
    subject,
    body,
    sendImmediately: sendNow,
  });

  if (success) {
    if (sendNow) {
      console.log("Email sent successfully!\n");
    } else {
      console.log("Email draft created. Check Mail app to review and send.\n");
    }
  } else {
    console.log("Failed to create email.\n");
  }
}

async function handleSearch() {
  console.log("\nFetching accounts...");
  const accounts = getAccounts();

  if (accounts.length === 0) {
    console.log("No mail accounts found.\n");
    return;
  }

  const selectedAccount = await select({
    message: "Select an account to search:",
    choices: [
      ...accounts.map((acc) => ({
        name: `${acc.name} (${acc.email})`,
        value: acc.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedAccount === "__back__") return;

  const searchField = await select({
    message: "Search in:",
    choices: [
      { name: "Subject", value: "subject" },
      { name: "Sender", value: "sender" },
      { name: "Content (body)", value: "content" },
    ],
  });

  const query = await input({
    message: "Search query:",
    validate: (val) => (val.length > 0 ? true : "Query required"),
  });

  console.log(`\nSearching for "${query}" in ${searchField}...`);
  const results = searchMails(selectedAccount, query, searchField as SearchField, 20);

  if (results.length === 0) {
    console.log("No matching emails found.\n");
    return;
  }

  console.log(`\n--- Found ${results.length} Result(s) ---`);
  results.forEach((mail) => {
    console.log(`\n#${mail.index}`);
    console.log(`  Subject: ${mail.subject}`);
    console.log(`  From: ${mail.sender}`);
    console.log(`  Date: ${mail.dateReceived}`);
    console.log(`  Mailbox: ${mail.mailbox}`);
  });
  console.log("");
}

async function handleCheckMail() {
  const accounts = getAccounts();

  const choice = await select({
    message: "Check mail for:",
    choices: [
      { name: "All Accounts", value: "__all__" },
      ...accounts.map((acc) => ({
        name: `${acc.name} (${acc.email})`,
        value: acc.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (choice === "__back__") return;

  console.log("\nChecking for new mail...");
  const success = checkMail(choice === "__all__" ? undefined : choice);

  if (success) {
    console.log("Mail check initiated. New messages will appear shortly.\n");
  } else {
    console.log("Failed to check mail.\n");
  }
}

async function handleUnreadCount() {
  const accounts = getAccounts();

  const choice = await select({
    message: "View unread count for:",
    choices: [
      { name: "All Accounts", value: "__all__" },
      ...accounts.map((acc) => ({
        name: `${acc.name} (${acc.email})`,
        value: acc.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (choice === "__back__") return;

  console.log("\nFetching unread counts...");
  const counts = getUnreadCount(choice === "__all__" ? undefined : choice);

  if (counts.length === 0) {
    console.log("No unread emails!\n");
    return;
  }

  console.log("\n--- Unread Emails ---");
  let total = 0;
  counts.forEach((item) => {
    console.log(`  ${item.account} / ${item.mailbox}: ${item.count}`);
    total += item.count;
  });
  console.log(`\n  Total: ${total} unread\n`);
}

// ==================== AUDIO MENU ====================

async function handleAudioMenu() {
  while (true) {
    const currentVolume = getVolume();
    const mutedStatus = isMuted();
    const mutedLabel = mutedStatus ? " [MUTED]" : "";

    const choice = await select({
      message: `Audio Controls (Volume: ${currentVolume}%${mutedLabel}):`,
      choices: [
        { name: `Set Volume (current: ${currentVolume}%)`, value: "set_volume" },
        { name: "Volume Up (+10%)", value: "volume_up" },
        { name: "Volume Down (-10%)", value: "volume_down" },
        { name: mutedStatus ? "Unmute" : "Mute", value: "toggle_mute" },
        { name: "Play Beep", value: "beep" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "set_volume") {
      const newVolume = await number({
        message: "Enter volume level (0-100):",
        default: currentVolume,
        min: 0,
        max: 100,
      });
      if (newVolume !== undefined) {
        setVolume(newVolume);
        console.log(`\nVolume set to ${newVolume}%\n`);
      }
    }

    if (choice === "volume_up") {
      const newVolume = Math.min(100, currentVolume + 10);
      setVolume(newVolume);
      console.log(`\nVolume: ${newVolume}%\n`);
    }

    if (choice === "volume_down") {
      const newVolume = Math.max(0, currentVolume - 10);
      setVolume(newVolume);
      console.log(`\nVolume: ${newVolume}%\n`);
    }

    if (choice === "toggle_mute") {
      const nowMuted = toggleMute();
      console.log(nowMuted ? "\nMuted\n" : "\nUnmuted\n");
    }

    if (choice === "beep") {
      const times = await number({
        message: "How many beeps? (1-10):",
        default: 1,
        min: 1,
        max: 10,
      });
      beep(times || 1);
      console.log(`\nPlayed ${times || 1} beep(s)\n`);
    }
  }
}

// ==================== FINDER MENU ====================

async function handleFinderMenu() {
  while (true) {
    const choice = await select({
      message: "Finder Options:",
      choices: [
        { name: "Get Selected Files", value: "selection" },
        { name: "Get Current Folder", value: "current_folder" },
        { name: "Open Path", value: "open" },
        { name: "Reveal in Finder", value: "reveal" },
        { name: "Get File Info", value: "info" },
        { name: "Create Folder", value: "create_folder" },
        { name: "Rename File", value: "rename" },
        { name: "Move File", value: "move" },
        { name: "Copy File", value: "copy" },
        { name: "Duplicate File", value: "duplicate" },
        { name: "Move to Trash", value: "trash" },
        { name: "Empty Trash", value: "empty_trash" },
        { name: "List Disks", value: "disks" },
        { name: "Eject Volume", value: "eject" },
        { name: "Desktop Wallpaper", value: "wallpaper" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "selection") {
      console.log("\nGetting selected items in Finder...");
      const items = getSelection();
      if (items.length === 0) {
        console.log("No items selected in Finder.\n");
      } else {
        console.log(`\n--- ${items.length} Selected Item(s) ---`);
        items.forEach((item, i) => {
          console.log(`\n${i + 1}. ${item.name}`);
          console.log(`   Path: ${item.path}`);
          console.log(`   Kind: ${item.kind}`);
        });
        console.log("");
      }
    }

    if (choice === "current_folder") {
      const folder = getCurrentFolder();
      console.log(`\nCurrent Finder folder: ${folder}\n`);
    }

    if (choice === "open") {
      const path = await input({
        message: "Enter path to open:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const success = openPath(path);
      console.log(success ? "\nOpened successfully.\n" : "\nFailed to open path.\n");
    }

    if (choice === "reveal") {
      const path = await input({
        message: "Enter path to reveal:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const success = revealInFinder(path);
      console.log(success ? "\nRevealed in Finder.\n" : "\nFailed to reveal path.\n");
    }

    if (choice === "info") {
      const path = await input({
        message: "Enter file path:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const info = getFileInfo(path);
      if (info) {
        console.log("\n--- File Info ---");
        console.log(`  Name: ${info.name}`);
        console.log(`  Path: ${info.path}`);
        console.log(`  Kind: ${info.kind}`);
        console.log(`  Size: ${info.size} bytes`);
        console.log(`  Created: ${info.creationDate}`);
        console.log(`  Modified: ${info.modificationDate}\n`);
      } else {
        console.log("\nCould not get file info.\n");
      }
    }

    if (choice === "create_folder") {
      const parentPath = await input({
        message: "Enter parent folder path:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const folderName = await input({
        message: "Enter new folder name:",
        validate: (val) => (val.length > 0 ? true : "Name required"),
      });
      const success = createFolder(parentPath, folderName);
      console.log(success ? "\nFolder created.\n" : "\nFailed to create folder.\n");
    }

    if (choice === "rename") {
      const path = await input({
        message: "Enter file path to rename:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const newName = await input({
        message: "Enter new name:",
        validate: (val) => (val.length > 0 ? true : "Name required"),
      });
      const success = renameFile(path, newName);
      console.log(success ? "\nFile renamed.\n" : "\nFailed to rename.\n");
    }

    if (choice === "move") {
      const source = await input({
        message: "Enter source file path:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const dest = await input({
        message: "Enter destination folder path:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const success = moveFile(source, dest);
      console.log(success ? "\nFile moved.\n" : "\nFailed to move file.\n");
    }

    if (choice === "copy") {
      const source = await input({
        message: "Enter source file path:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const dest = await input({
        message: "Enter destination folder path:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const success = copyFile(source, dest);
      console.log(success ? "\nFile copied.\n" : "\nFailed to copy file.\n");
    }

    if (choice === "duplicate") {
      const path = await input({
        message: "Enter file path to duplicate:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const success = duplicateFile(path);
      console.log(success ? "\nFile duplicated.\n" : "\nFailed to duplicate.\n");
    }

    if (choice === "trash") {
      const path = await input({
        message: "Enter file path to trash:",
        validate: (val) => (val.length > 0 ? true : "Path required"),
      });
      const confirmed = await confirm({
        message: `Are you sure you want to move "${path}" to trash?`,
        default: false,
      });
      if (confirmed) {
        const success = moveToTrash(path);
        console.log(success ? "\nMoved to trash.\n" : "\nFailed to trash file.\n");
      }
    }

    if (choice === "empty_trash") {
      const confirmed = await confirm({
        message: "Are you sure you want to empty the trash? This cannot be undone.",
        default: false,
      });
      if (confirmed) {
        const success = emptyTrash();
        console.log(success ? "\nTrash emptied.\n" : "\nFailed to empty trash.\n");
      }
    }

    if (choice === "disks") {
      const disks = getDisks();
      console.log("\n--- Mounted Disks ---");
      disks.forEach((disk, i) => {
        console.log(`  ${i + 1}. ${disk}`);
      });
      console.log("");
    }

    if (choice === "eject") {
      const disks = getDisks();
      if (disks.length === 0) {
        console.log("\nNo disks found.\n");
        continue;
      }

      const volumeName = await select({
        message: "Select volume to eject:",
        choices: [
          ...disks.map((d) => ({ name: d, value: d })),
          { name: "< Back", value: "__back__" },
        ],
      });

      if (volumeName === "__back__") continue;

      const success = ejectVolume(volumeName);
      console.log(success ? `\n${volumeName} ejected.\n` : "\nFailed to eject.\n");
    }

    if (choice === "wallpaper") {
      const wallpaperChoice = await select({
        message: "Desktop Wallpaper:",
        choices: [
          { name: "Get Current Wallpaper", value: "get" },
          { name: "Set New Wallpaper", value: "set" },
          { name: "< Back", value: "__back__" },
        ],
      });

      if (wallpaperChoice === "get") {
        const current = getDesktopPicture();
        console.log(`\nCurrent wallpaper: ${current}\n`);
      }

      if (wallpaperChoice === "set") {
        const imagePath = await input({
          message: "Enter image path:",
          validate: (val) => (val.length > 0 ? true : "Path required"),
        });
        const success = setDesktopPicture(imagePath);
        console.log(success ? "\nWallpaper updated.\n" : "\nFailed to set wallpaper.\n");
      }
    }
  }
}

// ==================== CHROME MENU ====================

async function handleChromeMenu() {
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

main().catch(console.error);
