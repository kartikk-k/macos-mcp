import { runAppleScript } from "./runAppleScript";

export interface Note {
  name: string;
  body: string;
  creationDate: string;
  modificationDate: string;
}

export function listNotes(folderName?: string): Note[] {
  const folderFilter = folderName ? `folder "${folderName}"` : "default folder";
  const script = `
tell application "Notes"
    set outputText to ""
    repeat with nt in notes of ${folderFilter}
        set outputText to outputText & (name of nt) & "|||"
        set outputText to outputText & (body of nt) & "|||"
        set outputText to outputText & (creation date of nt as string) & "|||"
        set outputText to outputText & (modification date of nt as string) & linefeed
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
        const [name, body, creationDate, modificationDate] = line.split("|||");
        return {
          name: name.trim(),
          body: body.trim(),
          creationDate: creationDate.trim(),
          modificationDate: modificationDate.trim(),
        };
      });
  } catch {
    return [];
  }
}

export interface CreateNoteParams {
  name: string;
  body: string;
  folderName?: string;
}

export function createNote(params: CreateNoteParams): boolean {
  const { name, body, folderName } = params;

  const folderRef = folderName ? `folder "${folderName}"` : "default folder";

  const script = `
tell application "Notes"
    tell ${folderRef}
        make new note with properties {name:"${name}", body:"${body}"}
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

export function deleteNote(name: string, folderName?: string): boolean {
  const folderFilter = folderName ? `folder "${folderName}"` : "default folder";
  const script = `
tell application "Notes"
    repeat with nt in notes of ${folderFilter}
        if name of nt is "${name}" then
            delete nt
        end if
    end repeat
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

export function updateNote(name: string, newBody: string, folderName?: string): boolean {
  const folderFilter = folderName ? `folder "${folderName}"` : "default folder";
  const script = `
tell application "Notes"
    repeat with nt in notes of ${folderFilter}
        if name of nt is "${name}" then
            set body of nt to "${newBody}"
        end if
    end repeat
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

export function moveNote(noteName: string, sourceFolderName: string | undefined, targetFolderName: string): boolean {
  const sourceFolderFilter = sourceFolderName ? `folder "${sourceFolderName}"` : "default folder";
  const script = `
tell application "Notes"
    set targetFolder to folder "${targetFolderName}"
    repeat with nt in notes of ${sourceFolderFilter}
        if name of nt is "${noteName}" then
            move nt to targetFolder
        end if
    end repeat
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

export function getNote(name: string, folderName?: string): Note | null {
  const folderFilter = folderName ? `folder "${folderName}"` : "default folder";
  const script = `
tell application "Notes"
    repeat with nt in notes of ${folderFilter}
        if name of nt is "${name}" then
            return (name of nt) & "|||" & (body of nt) & "|||" & (creation date of nt as string) & "|||" & (modification date of nt as string)
        end if
    end repeat
    return ""
end tell
`;
  try {
    const result = runAppleScript(script);
    if (!result) return null;

    const [noteName, body, creationDate, modificationDate] = result.split("|||");
    return {
      name: noteName.trim(),
      body: body.trim(),
      creationDate: creationDate.trim(),
      modificationDate: modificationDate.trim(),
    };
  } catch {
    return null;
  }
}
