export const calendarTools = [
  {
    name: "calendar_list_calendars",
    description: "List all calendars",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "calendar_list_events",
    description: "List calendar events",
    inputSchema: {
      type: "object" as const,
      properties: {
        calendarName: {
          type: "string",
          description: "Name of the calendar (optional, defaults to all calendars)",
        },
        daysAhead: {
          type: "number",
          description: "Number of days ahead to fetch events (default: 30)",
          default: 30,
        },
      },
      required: [],
    },
  },
  {
    name: "calendar_create_event",
    description: "Create a new calendar event",
    inputSchema: {
      type: "object" as const,
      properties: {
        summary: {
          type: "string",
          description: "Event title/summary",
        },
        startDate: {
          type: "string",
          description: "Start date and time (ISO 8601 format)",
        },
        endDate: {
          type: "string",
          description: "End date and time (ISO 8601 format)",
        },
        location: {
          type: "string",
          description: "Event location",
        },
        description: {
          type: "string",
          description: "Event description/notes",
        },
        allDayEvent: {
          type: "boolean",
          description: "Whether this is an all-day event",
          default: false,
        },
        calendarName: {
          type: "string",
          description: "Name of the calendar to add the event to",
        },
      },
      required: ["summary", "startDate", "endDate"],
    },
  },
  {
    name: "calendar_delete_event",
    description: "Delete a calendar event by title",
    inputSchema: {
      type: "object" as const,
      properties: {
        summary: {
          type: "string",
          description: "Event title/summary to delete",
        },
        calendarName: {
          type: "string",
          description: "Name of the calendar (optional)",
        },
      },
      required: ["summary"],
    },
  },
];
