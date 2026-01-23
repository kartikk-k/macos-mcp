import { runAppleScript } from "./runAppleScript";

export interface Folder {
  name: string;
}

export function listFolders(): Folder[] {
  const script = `
tell application "Notes"
    set outputText to ""
    repeat with fld in folders
        set outputText to outputText & (name of fld) & linefeed
    end repeat
    return outputText
end tell
`;
  try {
    const result = runAppleScript(script);
    if (!result) return [];

    return result
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => ({
        name: line.trim(),
      }));
  } catch {
    return [];
  }
}

export function createFolder(folderName: string): boolean {
  const script = `
tell application "Notes"
    make new folder with properties {name:"${folderName}"}
end tell
return "success"
`;
  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}

export function deleteFolder(folderName: string): boolean {
  const script = `
tell application "Notes"
    delete folder "${folderName}"
end tell
return "success"
`;
  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}

export interface FolderInfo {
  name: string;
  noteCount: number;
}

export function getFolderInfo(folderName: string): FolderInfo | null {
  const script = `
tell application "Notes"
    set targetFolder to folder "${folderName}"
    set noteCount to count of notes of targetFolder
    return (name of targetFolder) & "|||" & noteCount
end tell
`;
  try {
    const result = runAppleScript(script);
    const [name, noteCount] = result.split("|||");
    return {
      name: name.trim(),
      noteCount: parseInt(noteCount.trim()),
    };
  } catch {
    return null;
  }
}
