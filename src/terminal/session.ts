import { runAppleScript } from "./runAppleScript";

export function getCurrentDirectory(
  windowIndex: number = 1,
  tabIndex: number = 1
): string {
  const script = `
tell application "Terminal"
    set currentTab to tab ${tabIndex} of window ${windowIndex}
    do script "pwd" in currentTab
    delay 0.2
    set output to contents of currentTab
    set lines to paragraphs of output
    set lastLine to item -2 of lines
    return lastLine
end tell
`;
  try {
    const result = runAppleScript(script);
    return result.trim();
  } catch {
    return "";
  }
}

export function getProcesses(
  windowIndex: number = 1,
  tabIndex: number = 1
): string[] {
  const script = `
tell application "Terminal"
    set tabProcesses to processes of tab ${tabIndex} of window ${windowIndex}
    set processString to ""
    repeat with p in tabProcesses
        set processString to processString & p & linefeed
    end repeat
    return processString
end tell
`;
  try {
    const result = runAppleScript(script);
    return result
      .split("\n")
      .filter((p) => p.trim() !== "")
      .map((p) => p.trim());
  } catch {
    return [];
  }
}

export function isBusy(
  windowIndex: number = 1,
  tabIndex: number = 1
): { busy: boolean; processes: string[] } {
  const script = `
tell application "Terminal"
    set t to tab ${tabIndex} of window ${windowIndex}
    set isBusy to busy of t
    set tabProcesses to processes of t
    set processString to ""
    repeat with p in tabProcesses
        set processString to processString & p & ","
    end repeat
    return (isBusy as text) & "|||" & processString
end tell
`;
  try {
    const result = runAppleScript(script);
    const [busyStr, processesStr] = result.split("|||");
    const processes = processesStr
      .split(",")
      .filter((p) => p.trim() !== "")
      .map((p) => p.trim());

    return {
      busy: busyStr.trim() === "true",
      processes,
    };
  } catch {
    return { busy: false, processes: [] };
  }
}
