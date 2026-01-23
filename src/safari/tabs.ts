import { runAppleScript } from "./runAppleScript";

export interface Tab {
  windowIndex: number;
  tabIndex: number;
  name: string;
  url: string;
}

export function getAllTabs(): Tab[] {
  const script = `
tell application "Safari"
    set outputText to ""
    set winIndex to 1
    repeat with w in windows
        set tabIndex to 1
        repeat with t in tabs of w
            set outputText to outputText & winIndex & "|||" & tabIndex & "|||" & (name of t) & "|||" & (URL of t) & linefeed
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
        const [windowIndex, tabIndex, name, url] = line.split("|||");
        return {
          windowIndex: parseInt(windowIndex.trim()),
          tabIndex: parseInt(tabIndex.trim()),
          name: name.trim(),
          url: url.trim(),
        };
      });
  } catch {
    return [];
  }
}

export function getActiveTab(): Tab | null {
  const script = `
tell application "Safari"
    set w to front window
    set t to current tab of w

    -- Find the index of the current tab
    set tabIdx to 1
    repeat with testTab in tabs of w
        if testTab is t then
            exit repeat
        end if
        set tabIdx to tabIdx + 1
    end repeat

    return "1|||" & tabIdx & "|||" & (name of t) & "|||" & (URL of t)
end tell
`;
  try {
    const result = runAppleScript(script);
    const [windowIndex, tabIndex, name, url] = result.split("|||");
    return {
      windowIndex: parseInt(windowIndex.trim()),
      tabIndex: parseInt(tabIndex.trim()),
      name: name.trim(),
      url: url.trim(),
    };
  } catch {
    return null;
  }
}

export function openUrl(url: string, newTab: boolean = true): boolean {
  const script = newTab
    ? `
tell application "Safari"
    activate
    if (count of windows) = 0 then
        make new document
    end if
    tell front window
        set current tab to (make new tab with properties {URL:"${url}"})
    end tell
end tell
return "success"
`
    : `
tell application "Safari"
    activate
    if (count of windows) = 0 then
        make new document with properties {URL:"${url}"}
    else
        set URL of current tab of front window to "${url}"
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
tell application "Safari"
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
tell application "Safari"
    close current tab of front window
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
tell application "Safari"
    set current tab of window ${windowIndex} to tab ${tabIndex} of window ${windowIndex}
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
tell application "Safari"
    tell tab ${tabIndex} of window ${windowIndex}
        do JavaScript "window.location.reload();"
    end tell
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
tell application "Safari"
    tell current tab of front window
        do JavaScript "window.location.reload();"
    end tell
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
