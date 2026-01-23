import { runAppleScript } from "./runAppleScript";

export interface TerminalSettings {
  profileName: string;
  backgroundColor: string;
  textColor: string;
}

export function getContents(
  windowIndex: number = 1,
  tabIndex: number = 1,
  lineLimit?: number
): string {
  const script = `
tell application "Terminal"
    get contents of tab ${tabIndex} of window ${windowIndex}
end tell
`;
  try {
    let result = runAppleScript(script);

    if (lineLimit && lineLimit > 0) {
      const lines = result.split("\n");
      result = lines.slice(-lineLimit).join("\n");
    }

    return result;
  } catch {
    return "";
  }
}

export function getSelectedText(): string {
  const script = `
tell application "Terminal"
    set selectedTab to selected tab of front window
    get contents of selectedTab
end tell
`;
  try {
    const result = runAppleScript(script);
    return result;
  } catch {
    return "";
  }
}

export function clear(
  windowIndex: number = 1,
  tabIndex: number = 1
): boolean {
  const script = `
tell application "Terminal"
    do script "clear" in tab ${tabIndex} of window ${windowIndex}
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

export function getSettings(
  windowIndex: number = 1,
  tabIndex: number = 1
): TerminalSettings {
  const script = `
tell application "Terminal"
    set t to tab ${tabIndex} of window ${windowIndex}
    set currentSettings to current settings of t
    set profileName to name of currentSettings
    set bgColor to background color of currentSettings
    set fgColor to normal text color of currentSettings

    set bgColorString to (item 1 of bgColor as text) & "," & (item 2 of bgColor as text) & "," & (item 3 of bgColor as text)
    set fgColorString to (item 1 of fgColor as text) & "," & (item 2 of fgColor as text) & "," & (item 3 of fgColor as text)

    return profileName & "|||" & bgColorString & "|||" & fgColorString
end tell
`;
  try {
    const result = runAppleScript(script);
    const [profileName, bgColor, fgColor] = result.split("|||");

    return {
      profileName: profileName.trim(),
      backgroundColor: bgColor.trim(),
      textColor: fgColor.trim(),
    };
  } catch {
    return {
      profileName: "",
      backgroundColor: "",
      textColor: "",
    };
  }
}

export function setProfile(
  profileName: string,
  windowIndex: number = 1,
  tabIndex: number = 1
): boolean {
  const script = `
tell application "Terminal"
    set current settings of tab ${tabIndex} of window ${windowIndex} to settings set "${profileName}"
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
