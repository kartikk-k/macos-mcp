import { runAppleScript } from "./runAppleScript";

export interface ReminderList {
  name: string;
}

export interface Reminder {
  name: string;
  body: string;
  dueDate?: string;
  completed: boolean;
  priority: number;
}

export function getLists(): ReminderList[] {
  const script = `
tell application "Reminders"
    set outputText to ""
    repeat with lst in lists
        set outputText to outputText & (name of lst) & linefeed
    end repeat
    return outputText
end tell
`;
  try {
    const result = runAppleScript(script);
    if (!result) return [];

    return result
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => ({
        name: line.trim(),
      }));
  } catch {
    return [];
  }
}

export function getReminders(listName?: string): Reminder[] {
  const listFilter = listName ? `list "${listName}"` : "default list";
  const script = `
tell application "Reminders"
    set outputText to ""
    repeat with rem in reminders of ${listFilter}
        set outputText to outputText & (name of rem) & "|||"
        set outputText to outputText & (body of rem) & "|||"
        try
            set outputText to outputText & (due date of rem as string) & "|||"
        on error
            set outputText to outputText & "|||"
        end try
        set outputText to outputText & (completed of rem) & "|||"
        set outputText to outputText & (priority of rem) & linefeed
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
        const [name, body, dueDate, completed, priority] = line.split("|||");
        return {
          name: name.trim(),
          body: body.trim(),
          dueDate: dueDate.trim() || undefined,
          completed: completed.trim().toLowerCase() === "true",
          priority: parseInt(priority.trim()) || 0,
        };
      });
  } catch {
    return [];
  }
}

export interface CreateReminderParams {
  name: string;
  body?: string;
  dueDate?: Date;
  priority?: number;
  listName?: string;
}

export function createReminder(params: CreateReminderParams): boolean {
  const { name, body = "", dueDate, priority = 0, listName } = params;

  const listRef = listName ? `list "${listName}"` : "default list";

  const script = `
tell application "Reminders"
    tell ${listRef}
        set newReminder to make new reminder with properties {name:"${name}", body:"${body}", priority:${priority}}
        ${dueDate ? `set due date of newReminder to date "${dueDate.toLocaleString()}"` : ""}
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

export function completeReminder(name: string, listName?: string): boolean {
  const listFilter = listName ? `list "${listName}"` : "default list";
  const script = `
tell application "Reminders"
    repeat with rem in reminders of ${listFilter}
        if name of rem is "${name}" then
            set completed of rem to true
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

export function deleteReminder(name: string, listName?: string): boolean {
  const listFilter = listName ? `list "${listName}"` : "default list";
  const script = `
tell application "Reminders"
    repeat with rem in reminders of ${listFilter}
        if name of rem is "${name}" then
            delete rem
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

export interface UpdateReminderParams {
  name: string;
  listName?: string;
  newName?: string;
  newBody?: string;
  newDueDate?: Date;
  newPriority?: number;
}

export function updateReminder(params: UpdateReminderParams): boolean {
  const { name, listName, newName, newBody, newDueDate, newPriority } = params;
  const listFilter = listName ? `list "${listName}"` : "default list";

  const script = `
tell application "Reminders"
    repeat with rem in reminders of ${listFilter}
        if name of rem is "${name}" then
            ${newName ? `set name of rem to "${newName}"` : ""}
            ${newBody ? `set body of rem to "${newBody}"` : ""}
            ${newDueDate ? `set due date of rem to date "${newDueDate.toLocaleString()}"` : ""}
            ${newPriority !== undefined ? `set priority of rem to ${newPriority}` : ""}
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

export function createList(listName: string): boolean {
  const script = `
tell application "Reminders"
    make new list with properties {name:"${listName}"}
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

export function deleteList(listName: string): boolean {
  const script = `
tell application "Reminders"
    delete list "${listName}"
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

export function searchReminders(query: string): Reminder[] {
  const script = `
tell application "Reminders"
    set outputText to ""
    repeat with lst in lists
        repeat with rem in reminders of lst
            set remName to name of rem
            set remBody to body of rem
            if remName contains "${query}" or remBody contains "${query}" then
                set outputText to outputText & remName & "|||"
                set outputText to outputText & remBody & "|||"
                try
                    set outputText to outputText & (due date of rem as string) & "|||"
                on error
                    set outputText to outputText & "|||"
                end try
                set outputText to outputText & (completed of rem) & "|||"
                set outputText to outputText & (priority of rem) & linefeed
            end if
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
        const [name, body, dueDate, completed, priority] = line.split("|||");
        return {
          name: name.trim(),
          body: body.trim(),
          dueDate: dueDate.trim() || undefined,
          completed: completed.trim().toLowerCase() === "true",
          priority: parseInt(priority.trim()) || 0,
        };
      });
  } catch {
    return [];
  }
}
