import { runAppleScript } from "./runAppleScript";

export function getDesktopPicture(): string {
  const script = `
tell application "Finder"
    return POSIX path of (desktop picture as alias)
end tell
`;
  try {
    return runAppleScript(script);
  } catch {
    return "";
  }
}

export function setDesktopPicture(imagePath: string): boolean {
  const script = `
tell application "Finder"
    set desktop picture to POSIX file "${imagePath}"
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
