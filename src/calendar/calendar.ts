import { runAppleScript } from "./runAppleScript";

export interface Calendar {
  name: string;
  description: string;
}

export interface CalendarEvent {
  summary: string;
  startDate: string;
  endDate: string;
  location?: string;
  description?: string;
  allDayEvent: boolean;
}

export function listCalendars(): Calendar[] {
  const script = `
tell application "Calendar"
    set outputText to ""
    repeat with cal in calendars
        set outputText to outputText & (name of cal) & "|||" & (description of cal) & linefeed
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
        const [name, description] = line.split("|||");
        return {
          name: name.trim(),
          description: description.trim(),
        };
      });
  } catch {
    return [];
  }
}

export function listEvents(calendarName?: string, daysAhead: number = 30): CalendarEvent[] {
  const calendarFilter = calendarName ? `calendar "${calendarName}"` : "calendars";
  const script = `
tell application "Calendar"
    set outputText to ""
    set startDate to current date
    set endDate to (current date) + (${daysAhead} * days)

    repeat with cal in ${calendarFilter}
        set evs to (every event of cal whose start date ≥ startDate and start date ≤ endDate)
        repeat with evt in evs
            set outputText to outputText & (summary of evt) & "|||"
            set outputText to outputText & (start date of evt as string) & "|||"
            set outputText to outputText & (end date of evt as string) & "|||"
            set outputText to outputText & (location of evt) & "|||"
            set outputText to outputText & (description of evt) & "|||"
            set outputText to outputText & (allday event of evt) & linefeed
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
        const [summary, startDate, endDate, location, description, allDayEvent] = line.split("|||");
        return {
          summary: summary.trim(),
          startDate: startDate.trim(),
          endDate: endDate.trim(),
          location: location.trim() || undefined,
          description: description.trim() || undefined,
          allDayEvent: allDayEvent.trim().toLowerCase() === "true",
        };
      });
  } catch {
    return [];
  }
}

export interface CreateEventParams {
  summary: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  description?: string;
  allDayEvent?: boolean;
  calendarName?: string;
}

export function createEvent(params: CreateEventParams): boolean {
  const {
    summary,
    startDate,
    endDate,
    location = "",
    description = "",
    allDayEvent = false,
    calendarName,
  } = params;

  const calendarRef = calendarName ? `calendar "${calendarName}"` : "default calendar";

  const script = `
tell application "Calendar"
    tell ${calendarRef}
        set newEvent to make new event with properties {summary:"${summary}", start date:date "${startDate.toLocaleString()}", end date:date "${endDate.toLocaleString()}", allday event:${allDayEvent}}
        ${location ? `set location of newEvent to "${location}"` : ""}
        ${description ? `set description of newEvent to "${description}"` : ""}
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

export function deleteEvent(summary: string, calendarName?: string): boolean {
  const calendarFilter = calendarName ? `calendar "${calendarName}"` : "calendars";
  const script = `
tell application "Calendar"
    repeat with cal in ${calendarFilter}
        set evs to (every event of cal whose summary is "${summary}")
        repeat with evt in evs
            delete evt
        end repeat
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
