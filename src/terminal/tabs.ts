import { runAppleScript } from "./runAppleScript";

export interface TerminalTab {
  windowIndex: number;
  tabIndex: number;
  name: string;
  processes: string[];
}

export function getTabs(windowIndex: number = 1): TerminalTab[] {
  const script = `
tell application "Terminal"
    set output to ""
    set tabIndex to 1
    repeat with t in tabs of window ${windowIndex}
        set tabName to custom title of t
        if tabName is missing value then
            set tabName to name of t
        end if
        set tabProcesses to processes of t
        set processString to ""
        repeat with p in tabProcesses
            set processString to processString & p & ","
        end repeat
        set output to output & tabIndex & "|||" & tabName & "|||" & processString & linefeed
        set tabIndex to tabIndex + 1
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
        const [tabIndexStr, name, processesStr] = line.split("|||");
        const processes = processesStr
          .split(",")
          .filter((p) => p.trim() !== "")
          .map((p) => p.trim());

        return {
          windowIndex,
          tabIndex: parseInt(tabIndexStr.trim()),
          name: name.trim(),
          processes,
        };
      });
  } catch {
    return [];
  }
}

export function getActiveTab(): TerminalTab | null {
  const script = `
tell application "Terminal"
    set w to front window
    set t to selected tab of w
    set tabName to custom title of t
    if tabName is missing value then
        set tabName to name of t
    end if
    set tabProcesses to processes of t
    set processString to ""
    repeat with p in tabProcesses
        set processString to processString & p & ","
    end repeat

    -- Find tab index
    set tabIndex to 1
    repeat with currentTab in tabs of w
        if currentTab is t then
            exit repeat
        end if
        set tabIndex to tabIndex + 1
    end repeat

    return "1|||" & tabIndex & "|||" & tabName & "|||" & processString
end tell
`;
  try {
    const result = runAppleScript(script);
    const [windowIndexStr, tabIndexStr, name, processesStr] =
      result.split("|||");
    const processes = processesStr
      .split(",")
      .filter((p) => p.trim() !== "")
      .map((p) => p.trim());

    return {
      windowIndex: parseInt(windowIndexStr.trim()),
      tabIndex: parseInt(tabIndexStr.trim()),
      name: name.trim(),
      processes,
    };
  } catch {
    return null;
  }
}

export function newTab(
  windowIndex?: number,
  command?: string,
  workingDirectory?: string
): boolean {
  const targetWindow = windowIndex ?? 1;
  let script = "";

  if (workingDirectory && command) {
    script = `
tell application "Terminal"
    tell window ${targetWindow}
        set newTab to do script "cd '${workingDirectory}' && ${command}"
    end tell
    activate
end tell
return "success"
`;
  } else if (workingDirectory) {
    script = `
tell application "Terminal"
    tell window ${targetWindow}
        set newTab to do script "cd '${workingDirectory}'"
    end tell
    activate
end tell
return "success"
`;
  } else if (command) {
    script = `
tell application "Terminal"
    tell window ${targetWindow}
        set newTab to do script "${command}"
    end tell
    activate
end tell
return "success"
`;
  } else {
    script = `
tell application "Terminal"
    tell window ${targetWindow}
        set newTab to do script ""
    end tell
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

export function closeTab(
  windowIndex: number = 1,
  tabIndex: number = 1
): boolean {
  const script = `
tell application "Terminal"
    close tab ${tabIndex} of window ${windowIndex}
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

export function setActiveTab(
  windowIndex: number,
  tabIndex: number
): boolean {
  const script = `
tell application "Terminal"
    set selected of tab ${tabIndex} of window ${windowIndex} to true
    set index of window ${windowIndex} to 1
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
