import { runAppleScript } from "./runAppleScript";

export interface SafariWindow {
  index: number;
  tabCount: number;
  activeTabIndex: number;
}

export function getWindows(): SafariWindow[] {
  const script = `
tell application "Safari"
    set outputText to ""
    set winIndex to 1
    repeat with w in windows
        set tabCount to count of tabs of w

        -- Find the index of the current tab
        set activeIdx to 1
        set currentT to current tab of w
        set testIdx to 1
        repeat with testTab in tabs of w
            if testTab is currentT then
                set activeIdx to testIdx
                exit repeat
            end if
            set testIdx to testIdx + 1
        end repeat

        set outputText to outputText & winIndex & "|||" & tabCount & "|||" & activeIdx & linefeed
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
        const [index, tabCount, activeTabIndex] = line.split("|||");
        return {
          index: parseInt(index.trim()),
          tabCount: parseInt(tabCount.trim()),
          activeTabIndex: parseInt(activeTabIndex.trim()),
        };
      });
  } catch {
    return [];
  }
}

export function newWindow(url?: string): boolean {
  const script = url
    ? `
tell application "Safari"
    activate
    make new document with properties {URL:"${url}"}
end tell
return "success"
`
    : `
tell application "Safari"
    activate
    make new document
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
tell application "Safari"
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
tell application "Safari"
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
