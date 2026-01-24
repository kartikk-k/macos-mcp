import { select, input, confirm } from "@inquirer/prompts";
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
} from "../src/finder";

export async function handleFinderMenu() {
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
