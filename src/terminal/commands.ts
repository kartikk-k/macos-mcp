import { runAppleScript } from "./runAppleScript";

export function executeCommand(
  command: string,
  windowIndex: number = 1,
  tabIndex: number = 1,
  waitForCompletion: boolean = false
): boolean {
  const script = `
tell application "Terminal"
    do script "${command}" in tab ${tabIndex} of window ${windowIndex}
end tell
return "success"
`;
  try {
    runAppleScript(script);

    // If waiting for completion, check busy status
    if (waitForCompletion) {
      // Wait a bit for command to start and finish
      // Note: This is a simple implementation, production code might need better polling
      const waitScript = `
tell application "Terminal"
    delay 0.5
    repeat while busy of tab ${tabIndex} of window ${windowIndex}
        delay 0.1
    end repeat
end tell
return "success"
`;
      runAppleScript(waitScript);
    }

    return true;
  } catch {
    return false;
  }
}

export function executeInActiveTab(command: string): boolean {
  const script = `
tell application "Terminal"
    do script "${command}" in selected tab of front window
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
