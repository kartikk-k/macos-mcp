import { runAppleScript } from "./runAppleScript";

export function goBack(windowIndex: number = 1, tabIndex: number = 1): boolean {
  const script = `
tell application "Safari"
    tell tab ${tabIndex} of window ${windowIndex}
        do JavaScript "window.history.back();"
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

export function goForward(windowIndex: number = 1, tabIndex: number = 1): boolean {
  const script = `
tell application "Safari"
    tell tab ${tabIndex} of window ${windowIndex}
        do JavaScript "window.history.forward();"
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

export function goBackActiveTab(): boolean {
  const script = `
tell application "Safari"
    tell current tab of front window
        do JavaScript "window.history.back();"
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

export function goForwardActiveTab(): boolean {
  const script = `
tell application "Safari"
    tell current tab of front window
        do JavaScript "window.history.forward();"
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
