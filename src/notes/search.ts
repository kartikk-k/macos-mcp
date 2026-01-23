import { runAppleScript } from "./runAppleScript";

export interface Note {
  name: string;
  body: string;
  creationDate: string;
  modificationDate: string;
  folderName: string;
}

export function searchNotes(query: string): Note[] {
  const script = `
tell application "Notes"
    set outputText to ""
    repeat with fld in folders
        set folderName to name of fld
        repeat with nt in notes of fld
            try
                set noteBody to body of nt
                set noteName to name of nt
                if noteBody contains "${query}" or noteName contains "${query}" then
                    set outputText to outputText & noteName & "|||"
                    set outputText to outputText & noteBody & "|||"
                    set outputText to outputText & (creation date of nt as string) & "|||"
                    set outputText to outputText & (modification date of nt as string) & "|||"
                    set outputText to outputText & folderName & linefeed
                end if
            end try
        end repeat
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
        const [name, body, creationDate, modificationDate, folderName] = line.split("|||");
        return {
          name: name.trim(),
          body: body.trim(),
          creationDate: creationDate.trim(),
          modificationDate: modificationDate.trim(),
          folderName: folderName.trim(),
        };
      });
  } catch {
    return [];
  }
}

export function searchInFolder(query: string, folderName: string): Note[] {
  const script = `
tell application "Notes"
    set outputText to ""
    set targetFolder to folder "${folderName}"
    set folderName to name of targetFolder
    repeat with nt in notes of targetFolder
        try
            set noteBody to body of nt
            set noteName to name of nt
            if noteBody contains "${query}" or noteName contains "${query}" then
                set outputText to outputText & noteName & "|||"
                set outputText to outputText & noteBody & "|||"
                set outputText to outputText & (creation date of nt as string) & "|||"
                set outputText to outputText & (modification date of nt as string) & "|||"
                set outputText to outputText & folderName & linefeed
            end if
        end try
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
        const [name, body, creationDate, modificationDate, folder] = line.split("|||");
        return {
          name: name.trim(),
          body: body.trim(),
          creationDate: creationDate.trim(),
          modificationDate: modificationDate.trim(),
          folderName: folder.trim(),
        };
      });
  } catch {
    return [];
  }
}

export function searchByTitle(query: string): Note[] {
  const script = `
tell application "Notes"
    set outputText to ""
    repeat with fld in folders
        set folderName to name of fld
        repeat with nt in notes of fld
            try
                set noteName to name of nt
                if noteName contains "${query}" then
                    set outputText to outputText & noteName & "|||"
                    set outputText to outputText & (body of nt) & "|||"
                    set outputText to outputText & (creation date of nt as string) & "|||"
                    set outputText to outputText & (modification date of nt as string) & "|||"
                    set outputText to outputText & folderName & linefeed
                end if
            end try
        end repeat
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
        const [name, body, creationDate, modificationDate, folderName] = line.split("|||");
        return {
          name: name.trim(),
          body: body.trim(),
          creationDate: creationDate.trim(),
          modificationDate: modificationDate.trim(),
          folderName: folderName.trim(),
        };
      });
  } catch {
    return [];
  }
}
