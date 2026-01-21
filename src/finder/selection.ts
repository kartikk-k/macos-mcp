import { runAppleScript } from "./runAppleScript";

export interface SelectedItem {
  name: string;
  path: string;
  kind: string;
}

export function getSelection(): SelectedItem[] {
  const script = `
tell application "Finder"
    set selectedItems to selection
    set outputText to ""
    repeat with theItem in selectedItems
        set itemName to name of theItem
        set itemPath to POSIX path of (theItem as alias)
        set itemKind to kind of theItem
        set outputText to outputText & itemName & "|||" & itemPath & "|||" & itemKind & linefeed
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
        const [name, path, kind] = line.split("|||");
        return {
          name: name.trim(),
          path: path.trim(),
          kind: kind.trim(),
        };
      });
  } catch {
    return [];
  }
}

export function getCurrentFolder(): string {
  const script = `
tell application "Finder"
    if (count of windows) > 0 then
        return POSIX path of (target of front window as alias)
    else
        return POSIX path of (desktop as alias)
    end if
end tell
`;
  try {
    return runAppleScript(script);
  } catch {
    return "";
  }
}
