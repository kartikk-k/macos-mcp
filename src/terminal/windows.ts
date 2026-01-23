import { runAppleScript } from "./runAppleScript";

export interface TerminalWindow {
  windowIndex: number;
  name: string;
  tabCount: number;
}

export function getWindows(): TerminalWindow[] {
  const script = `
tell application "Terminal"
    set output to ""
    set winIndex to 1
    repeat with w in windows
        set tabCount to count of tabs of w
        set winName to name of w
        set output to output & winIndex & "|||" & winName & "|||" & tabCount & linefeed
        set winIndex to winIndex + 1
    end repeat
    return output
end tell
`;
  try {
    const result = runAppleScript(script);
    if (!result) return [];

    return result
      .split("\n")
      .filter((line) => line.includes("|||"))
      .map((line) => {
        const [windowIndex, name, tabCount] = line.split("|||");
        return {
          windowIndex: parseInt(windowIndex.trim()),
          name: name.trim(),
          tabCount: parseInt(tabCount.trim()),
        };
      });
  } catch {
    return [];
  }
}

export function newWindow(
  command?: string,
  workingDirectory?: string
): boolean {
  let script = "";

  if (workingDirectory && command) {
    script = `
tell application "Terminal"
    do script "cd '${workingDirectory}' && ${command}"
    activate
end tell
return "success"
`;
  } else if (workingDirectory) {
    script = `
tell application "Terminal"
    do script "cd '${workingDirectory}'"
    activate
end tell
return "success"
`;
  } else if (command) {
    script = `
tell application "Terminal"
    do script "${command}"
    activate
end tell
return "success"
`;
  } else {
    script = `
tell application "Terminal"
    do script ""
    activate
end tell
return "success"
`;
  }

  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}

export function closeWindow(windowIndex: number = 1): boolean {
  const script = `
tell application "Terminal"
    close window ${windowIndex}
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

export function focusWindow(windowIndex: number = 1): boolean {
  const script = `
tell application "Terminal"
    activate
    set index of window ${windowIndex} to 1
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
