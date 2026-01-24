import { select, input, confirm } from "@inquirer/prompts";
import {
  listCalendars,
  listEvents,
  createEvent,
  deleteEvent,
  type Calendar,
  type CreateEventParams,
} from "../src/calendar";

export async function handleCalendarMenu() {
  while (true) {
    const choice = await select({
      message: "Calendar Options:",
      choices: [
        { name: "List Calendars", value: "list_calendars" },
        { name: "List Events", value: "list_events" },
        { name: "Create Event", value: "create_event" },
        { name: "Delete Event", value: "delete_event" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "list_calendars") await handleListCalendars();
    if (choice === "list_events") await handleListEvents();
    if (choice === "create_event") await handleCreateEvent();
    if (choice === "delete_event") await handleDeleteEvent();
  }
}

async function handleListCalendars() {
  console.log("\nFetching calendars...");
  const calendars = listCalendars();

  if (calendars.length === 0) {
    console.log("No calendars found.\n");
    return;
  }

  console.log("\n--- Calendars ---");
  calendars.forEach((cal, i) => {
    console.log(`${i + 1}. ${cal.name} (${cal.description || "No description"})`);
  });
  console.log("");
}

async function handleListEvents() {
  const calendars = listCalendars();

  if (calendars.length === 0) {
    console.log("No calendars found.\n");
    return;
  }

  const selectedCalendar = await select({
    message: "Select a calendar:",
    choices: [
      ...calendars.map((cal) => ({
        name: cal.name,
        value: cal.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedCalendar === "__back__") return;

  const daysAhead = await input({
    message: "Days ahead to search (default: 30):",
    default: "30",
  });

  console.log(`\nFetching events from ${selectedCalendar}...`);
  const events = listEvents(selectedCalendar, parseInt(daysAhead) || 30);

  if (events.length === 0) {
    console.log("No upcoming events found.\n");
    return;
  }

  console.log("\n--- Events ---");
  events.forEach((event) => {
    console.log(`\n${event.summary}`);
    console.log(`  Start: ${event.startDate}`);
    console.log(`  End: ${event.endDate}`);
    if (event.location) console.log(`  Location: ${event.location}`);
    if (event.description) console.log(`  Description: ${event.description}`);
  });
  console.log("");
}

async function handleCreateEvent() {
  const calendars = listCalendars();

  if (calendars.length === 0) {
    console.log("No calendars found.\n");
    return;
  }

  const calendarName = await select({
    message: "Select a calendar:",
    choices: calendars.map((cal) => ({
      name: cal.name,
      value: cal.name,
    })),
  });

  const summary = await input({
    message: "Event title:",
    validate: (val) => (val.length > 0 ? true : "Title required"),
  });

  const startDate = await input({
    message: "Start date (YYYY-MM-DD HH:MM):",
    validate: (val) => (val.length > 0 ? true : "Start date required"),
  });

  const endDate = await input({
    message: "End date (YYYY-MM-DD HH:MM):",
    validate: (val) => (val.length > 0 ? true : "End date required"),
  });

  const location = await input({
    message: "Location (optional):",
  });

  const description = await input({
    message: "Description (optional):",
  });

  const params: CreateEventParams = {
    calendarName,
    summary,
    startDate,
    endDate,
  };

  if (location) params.location = location;
  if (description) params.description = description;

  console.log("\nCreating event...");
  const success = createEvent(params);

  if (success) {
    console.log("Event created successfully!\n");
  } else {
    console.log("Failed to create event.\n");
  }
}

async function handleDeleteEvent() {
  const calendars = listCalendars();

  if (calendars.length === 0) {
    console.log("No calendars found.\n");
    return;
  }

  const calendarName = await select({
    message: "Select a calendar:",
    choices: calendars.map((cal) => ({
      name: cal.name,
      value: cal.name,
    })),
  });

  const events = listEvents(calendarName, 30);

  if (events.length === 0) {
    console.log("No events found in this calendar.\n");
    return;
  }

  const eventSummary = await select({
    message: "Select an event to delete:",
    choices: [
      ...events.map((event) => ({
        name: `${event.summary} (${event.startDate})`,
        value: event.summary,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (eventSummary === "__back__") return;

  const confirmDelete = await confirm({
    message: `Delete event "${eventSummary}"?`,
    default: false,
  });

  if (!confirmDelete) {
    console.log("Cancelled.\n");
    return;
  }

  console.log("\nDeleting event...");
  const success = deleteEvent(calendarName, eventSummary);

  if (success) {
    console.log("Event deleted successfully!\n");
  } else {
    console.log("Failed to delete event.\n");
  }
}
