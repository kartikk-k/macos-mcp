import { runAppleScript } from "./runAppleScript";

export function goBack(windowIndex: number = 1, tabIndex: number = 1): boolean {
  const script = `
tell application "Google Chrome"
    tell tab ${tabIndex} of window ${windowIndex}
        go back
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
tell application "Google Chrome"
    tell tab ${tabIndex} of window ${windowIndex}
        go forward
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
tell application "Google Chrome"
    tell active tab of front window
        go back
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
tell application "Google Chrome"
    tell active tab of front window
        go forward
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
