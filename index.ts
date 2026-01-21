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

main().catch(console.error);
