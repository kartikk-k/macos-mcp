import { runAppleScript } from "./runAppleScript";

export interface Tab {
  windowIndex: number;
  tabIndex: number;
  title: string;
  url: string;
}

export function getAllTabs(): Tab[] {
  const script = `
tell application "Google Chrome"
    set outputText to ""
    set winIndex to 1
    repeat with w in windows
        set tabIndex to 1
        repeat with t in tabs of w
            set outputText to outputText & winIndex & "|||" & tabIndex & "|||" & (title of t) & "|||" & (URL of t) & linefeed
            set tabIndex to tabIndex + 1
        end repeat
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
        const [windowIndex, tabIndex, title, url] = line.split("|||");
        return {
          windowIndex: parseInt(windowIndex.trim()),
          tabIndex: parseInt(tabIndex.trim()),
          title: title.trim(),
          url: url.trim(),
        };
      });
  } catch {
    return [];
  }
}

export function getActiveTab(): Tab | null {
  const script = `
tell application "Google Chrome"
    set w to front window
    set t to active tab of w
    return "1|||" & (active tab index of w) & "|||" & (title of t) & "|||" & (URL of t)
end tell
`;
  try {
    const result = runAppleScript(script);
    const [windowIndex, tabIndex, title, url] = result.split("|||");
    return {
      windowIndex: parseInt(windowIndex.trim()),
      tabIndex: parseInt(tabIndex.trim()),
      title: title.trim(),
      url: url.trim(),
    };
  } catch {
    return null;
  }
}

export function openUrl(url: string, newTab: boolean = true): boolean {
  const script = newTab
    ? `
tell application "Google Chrome"
    activate
    if (count of windows) = 0 then
        make new window
    end if
    tell front window
        make new tab with properties {URL:"${url}"}
    end tell
end tell
return "success"
`
    : `
tell application "Google Chrome"
    activate
    if (count of windows) = 0 then
        make new window with properties {URL:"${url}"}
    else
        set URL of active tab of front window to "${url}"
    end if
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

export function closeTab(windowIndex: number = 1, tabIndex: number = 1): boolean {
  const script = `
tell application "Google Chrome"
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

export function closeActiveTab(): boolean {
  const script = `
tell application "Google Chrome"
    close active tab of front window
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

export function setActiveTab(windowIndex: number, tabIndex: number): boolean {
  const script = `
tell application "Google Chrome"
    set active tab index of window ${windowIndex} to ${tabIndex}
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

export function reloadTab(windowIndex: number = 1, tabIndex: number = 1): boolean {
  const script = `
tell application "Google Chrome"
    reload tab ${tabIndex} of window ${windowIndex}
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

export function reloadActiveTab(): boolean {
  const script = `
tell application "Google Chrome"
    reload active tab of front window
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
