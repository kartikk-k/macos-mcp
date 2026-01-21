import { runAppleScript } from "./runAppleScript";

export interface FileInfo {
  name: string;
  path: string;
  kind: string;
  size: number;
  creationDate: string;
  modificationDate: string;
}

export function getFileInfo(path: string): FileInfo | null {
  const script = `
tell application "Finder"
    set theItem to POSIX file "${path}" as alias
    set itemName to name of theItem
    set itemPath to POSIX path of theItem
    set itemKind to kind of theItem
    set itemSize to size of theItem
    set itemCreated to creation date of theItem as string
    set itemModified to modification date of theItem as string
    return itemName & "|||" & itemPath & "|||" & itemKind & "|||" & itemSize & "|||" & itemCreated & "|||" & itemModified
end tell
`;
  try {
    const result = runAppleScript(script);
    const [name, filePath, kind, size, creationDate, modificationDate] = result.split("|||");
    return {
      name: name.trim(),
      path: filePath.trim(),
      kind: kind.trim(),
      size: parseInt(size.trim()) || 0,
      creationDate: creationDate.trim(),
      modificationDate: modificationDate.trim(),
    };
  } catch {
    return null;
  }
}

export function getDisks(): string[] {
  const script = `
tell application "Finder"
    set diskList to ""
    repeat with d in disks
        set diskList to diskList & (name of d) & linefeed
    end repeat
    return diskList
end tell
`;
  try {
    const result = runAppleScript(script);
    return result.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}
