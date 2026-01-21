import { runAppleScript } from "./runAppleScript";

export interface ChromeWindow {
  index: number;
  tabCount: number;
  activeTabIndex: number;
  mode: string;
}

export function getWindows(): ChromeWindow[] {
  const script = `
tell application "Google Chrome"
    set outputText to ""
    set winIndex to 1
    repeat with w in windows
        set tabCount to count of tabs of w
        set activeIdx to active tab index of w
        set winMode to mode of w
        set outputText to outputText & winIndex & "|||" & tabCount & "|||" & activeIdx & "|||" & winMode & linefeed
        set winIndex to winIndex + 1
    end repeat
    return outputText
end tell
`;
  try {
    const result = runAppleScript(script);
    if (!result) return [];

    return result
      .split("\n")
      .filter((line) => line.includes("|||"))
      .map((line) => {
        const [index, tabCount, activeTabIndex, mode] = line.split("|||");
        return {
          index: parseInt(index.trim()),
          tabCount: parseInt(tabCount.trim()),
          activeTabIndex: parseInt(activeTabIndex.trim()),
          mode: mode.trim(),
        };
      });
  } catch {
    return [];
  }
}

export function newWindow(url?: string, incognito: boolean = false): boolean {
  const script = incognito
    ? `
tell application "Google Chrome"
    activate
    set w to make new window with properties {mode:"incognito"}
    ${url ? `set URL of active tab of w to "${url}"` : ""}
end tell
return "success"
`
    : `
tell application "Google Chrome"
    activate
    ${url ? `make new window with properties {URL:"${url}"}` : "make new window"}
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

export function closeWindow(windowIndex: number = 1): boolean {
  const script = `
tell application "Google Chrome"
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
tell application "Google Chrome"
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
