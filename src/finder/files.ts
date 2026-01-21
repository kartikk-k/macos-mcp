import { runAppleScript } from "./runAppleScript";

export function openPath(path: string): boolean {
  const script = `
tell application "Finder"
    open POSIX file "${path}"
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

export function revealInFinder(path: string): boolean {
  const script = `
tell application "Finder"
    reveal POSIX file "${path}"
    activate
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

export function createFolder(parentPath: string, folderName: string): boolean {
  const script = `
tell application "Finder"
    make new folder at POSIX file "${parentPath}" with properties {name:"${folderName}"}
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

export function moveToTrash(path: string): boolean {
  const script = `
tell application "Finder"
    delete POSIX file "${path}"
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

export function emptyTrash(): boolean {
  const script = `
tell application "Finder"
    empty trash
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

export function duplicateFile(path: string): boolean {
  const script = `
tell application "Finder"
    duplicate POSIX file "${path}"
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

export function moveFile(sourcePath: string, destinationFolder: string): boolean {
  const script = `
tell application "Finder"
    move POSIX file "${sourcePath}" to POSIX file "${destinationFolder}"
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

export function copyFile(sourcePath: string, destinationFolder: string): boolean {
  const script = `
tell application "Finder"
    duplicate POSIX file "${sourcePath}" to POSIX file "${destinationFolder}"
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

export function renameFile(path: string, newName: string): boolean {
  const script = `
tell application "Finder"
    set name of POSIX file "${path}" to "${newName}"
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

export function ejectVolume(volumeName: string): boolean {
  const script = `
tell application "Finder"
    eject disk "${volumeName}"
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
