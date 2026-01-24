import {
  listCalendars,
  listEvents,
  createEvent,
  deleteEvent,
} from "../../src/calendar";

export function handleCalendarTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "calendar_list_calendars":
      return listCalendars();
    case "calendar_list_events":
      return listEvents(
        (args as { calendarName?: string; daysAhead?: number }).calendarName,
        (args as { calendarName?: string; daysAhead?: number }).daysAhead
      );
    case "calendar_create_event": {
      const eventArgs = args as {
        summary: string;
        startDate: string;
        endDate: string;
        location?: string;
        description?: string;
        allDayEvent?: boolean;
        calendarName?: string;
      };
      return {
        success: createEvent({
          summary: eventArgs.summary,
          startDate: new Date(eventArgs.startDate),
          endDate: new Date(eventArgs.endDate),
          location: eventArgs.location,
          description: eventArgs.description,
          allDayEvent: eventArgs.allDayEvent,
          calendarName: eventArgs.calendarName,
        }),
      };
    }
    case "calendar_delete_event":
      return {
        success: deleteEvent(
          (args as { summary: string; calendarName?: string }).summary,
          (args as { summary: string; calendarName?: string }).calendarName
        ),
      };
    default:
      throw new Error(`Unknown calendar tool: ${name}`);
  }
}
