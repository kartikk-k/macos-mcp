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
} from "../../src/finder";

export function handleFinderTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "finder_open_path":
      return { success: openPath((args as { path: string }).path) };
    case "finder_reveal":
      return { success: revealInFinder((args as { path: string }).path) };
    case "finder_create_folder":
      return {
        success: createFolder(
          (args as { parentPath: string; folderName: string }).parentPath,
          (args as { parentPath: string; folderName: string }).folderName
        ),
      };
    case "finder_move_to_trash":
      return { success: moveToTrash((args as { path: string }).path) };
    case "finder_empty_trash":
      return { success: emptyTrash() };
    case "finder_duplicate":
      return { success: duplicateFile((args as { path: string }).path) };
    case "finder_move":
      return {
        success: moveFile(
          (args as { sourcePath: string; destinationFolder: string })
            .sourcePath,
          (args as { sourcePath: string; destinationFolder: string })
            .destinationFolder
        ),
      };
    case "finder_copy":
      return {
        success: copyFile(
          (args as { sourcePath: string; destinationFolder: string })
            .sourcePath,
          (args as { sourcePath: string; destinationFolder: string })
            .destinationFolder
        ),
      };
    case "finder_rename":
      return {
        success: renameFile(
          (args as { path: string; newName: string }).path,
          (args as { path: string; newName: string }).newName
        ),
      };
    case "finder_eject":
      return {
        success: ejectVolume((args as { volumeName: string }).volumeName),
      };
    case "finder_get_selection":
      return getSelection();
    case "finder_get_current_folder":
      return { path: getCurrentFolder() };
    case "finder_get_desktop_picture":
      return { path: getDesktopPicture() };
    case "finder_set_desktop_picture":
      return {
        success: setDesktopPicture((args as { imagePath: string }).imagePath),
      };
    case "finder_get_file_info":
      return getFileInfo((args as { path: string }).path);
    case "finder_get_disks":
      return { disks: getDisks() };
    default:
      throw new Error(`Unknown finder tool: ${name}`);
  }
}
