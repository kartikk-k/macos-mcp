import { select, input, confirm } from "@inquirer/prompts";
import {
  getLists,
  getReminders,
  createReminder,
  completeReminder,
  deleteReminder,
  updateReminder,
  createList,
  deleteList,
  searchReminders,
  type ReminderList,
  type CreateReminderParams,
  type UpdateReminderParams,
} from "../src/reminders";

export async function handleRemindersMenu() {
  while (true) {
    const choice = await select({
      message: "Reminders Options:",
      choices: [
        { name: "List Reminders", value: "list" },
        { name: "Create Reminder", value: "create" },
        { name: "Complete Reminder", value: "complete" },
        { name: "Update Reminder", value: "update" },
        { name: "Delete Reminder", value: "delete" },
        { name: "Search Reminders", value: "search" },
        { name: "--- Lists ---", value: "__separator__", disabled: true },
        { name: "View Lists", value: "view_lists" },
        { name: "Create List", value: "create_list" },
        { name: "Delete List", value: "delete_list" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "list") await handleListReminders();
    if (choice === "create") await handleCreateReminder();
    if (choice === "complete") await handleCompleteReminder();
    if (choice === "update") await handleUpdateReminder();
    if (choice === "delete") await handleDeleteReminder();
    if (choice === "search") await handleSearchReminders();
    if (choice === "view_lists") await handleViewLists();
    if (choice === "create_list") await handleCreateList();
    if (choice === "delete_list") await handleDeleteList();
  }
}

async function handleListReminders() {
  const lists = getLists();

  if (lists.length === 0) {
    console.log("No reminder lists found.\n");
    return;
  }

  const selectedList = await select({
    message: "Select a list:",
    choices: [
      ...lists.map((list) => ({
        name: list.name,
        value: list.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedList === "__back__") return;

  console.log("\nFetching reminders...");
  const reminders = getReminders(selectedList);

  if (reminders.length === 0) {
    console.log("No reminders found in this list.\n");
    return;
  }

  console.log("\n--- Reminders ---");
  reminders.forEach((reminder, i) => {
    const status = reminder.completed ? "[✓]" : "[ ]";
    console.log(`${i + 1}. ${status} ${reminder.name}`);
    if (reminder.body) console.log(`   ${reminder.body}`);
    if (reminder.dueDate) console.log(`   Due: ${reminder.dueDate}`);
    if (reminder.priority) console.log(`   Priority: ${reminder.priority}`);
  });
  console.log("");
}

async function handleCreateReminder() {
  const lists = getLists();

  if (lists.length === 0) {
    console.log("No reminder lists found.\n");
    return;
  }

  const listName = await select({
    message: "Select a list:",
    choices: lists.map((list) => ({
      name: list.name,
      value: list.name,
    })),
  });

  const name = await input({
    message: "Reminder title:",
    validate: (val) => (val.length > 0 ? true : "Title required"),
  });

  const body = await input({
    message: "Notes (optional):",
  });

  const dueDate = await input({
    message: "Due date (YYYY-MM-DD HH:MM, optional):",
  });

  const priority = await select({
    message: "Priority:",
    choices: [
      { name: "None", value: "0" },
      { name: "Low", value: "1" },
      { name: "Medium", value: "5" },
      { name: "High", value: "9" },
    ],
  });

  const params: CreateReminderParams = {
    listName,
    name,
  };

  if (body) params.body = body;
  if (dueDate) params.dueDate = dueDate;
  if (priority !== "0") params.priority = parseInt(priority);

  console.log("\nCreating reminder...");
  const success = createReminder(params);

  if (success) {
    console.log("Reminder created successfully!\n");
  } else {
    console.log("Failed to create reminder.\n");
  }
}

async function handleCompleteReminder() {
  const lists = getLists();

  if (lists.length === 0) {
    console.log("No reminder lists found.\n");
    return;
  }

  const listName = await select({
    message: "Select a list:",
    choices: lists.map((list) => ({
      name: list.name,
      value: list.name,
    })),
  });

  const reminders = getReminders(listName);

  if (reminders.length === 0) {
    console.log("No reminders found in this list.\n");
    return;
  }

  const incompleteReminders = reminders.filter((r) => !r.completed);

  if (incompleteReminders.length === 0) {
    console.log("All reminders are already completed!\n");
    return;
  }

  const selectedReminder = await select({
    message: "Select a reminder to complete:",
    choices: [
      ...incompleteReminders.map((reminder) => ({
        name: reminder.name,
        value: reminder.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedReminder === "__back__") return;

  console.log("\nCompleting reminder...");
  const success = completeReminder(listName, selectedReminder);

  if (success) {
    console.log("Reminder completed successfully!\n");
  } else {
    console.log("Failed to complete reminder.\n");
  }
}

async function handleUpdateReminder() {
  const lists = getLists();

  if (lists.length === 0) {
    console.log("No reminder lists found.\n");
    return;
  }

  const listName = await select({
    message: "Select a list:",
    choices: lists.map((list) => ({
      name: list.name,
      value: list.name,
    })),
  });

  const reminders = getReminders(listName);

  if (reminders.length === 0) {
    console.log("No reminders found in this list.\n");
    return;
  }

  const selectedReminder = await select({
    message: "Select a reminder to update:",
    choices: [
      ...reminders.map((reminder) => ({
        name: reminder.name,
        value: reminder.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedReminder === "__back__") return;

  const body = await input({
    message: "New notes (leave empty to skip):",
  });

  const dueDate = await input({
    message: "New due date (YYYY-MM-DD HH:MM, leave empty to skip):",
  });

  const priority = await select({
    message: "New priority (or skip):",
    choices: [
      { name: "Skip", value: "__skip__" },
      { name: "None", value: "0" },
      { name: "Low", value: "1" },
      { name: "Medium", value: "5" },
      { name: "High", value: "9" },
    ],
  });

  const params: UpdateReminderParams = {
    listName,
    name: selectedReminder,
  };

  if (body) params.body = body;
  if (dueDate) params.dueDate = dueDate;
  if (priority !== "__skip__") params.priority = parseInt(priority);

  console.log("\nUpdating reminder...");
  const success = updateReminder(params);

  if (success) {
    console.log("Reminder updated successfully!\n");
  } else {
    console.log("Failed to update reminder.\n");
  }
}

async function handleDeleteReminder() {
  const lists = getLists();

  if (lists.length === 0) {
    console.log("No reminder lists found.\n");
    return;
  }

  const listName = await select({
    message: "Select a list:",
    choices: lists.map((list) => ({
      name: list.name,
      value: list.name,
    })),
  });

  const reminders = getReminders(listName);

  if (reminders.length === 0) {
    console.log("No reminders found in this list.\n");
    return;
  }

  const selectedReminder = await select({
    message: "Select a reminder to delete:",
    choices: [
      ...reminders.map((reminder) => ({
        name: reminder.name,
        value: reminder.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedReminder === "__back__") return;

  const confirmDelete = await confirm({
    message: `Delete reminder "${selectedReminder}"?`,
    default: false,
  });

  if (!confirmDelete) {
    console.log("Cancelled.\n");
    return;
  }

  console.log("\nDeleting reminder...");
  const success = deleteReminder(listName, selectedReminder);

  if (success) {
    console.log("Reminder deleted successfully!\n");
  } else {
    console.log("Failed to delete reminder.\n");
  }
}

async function handleSearchReminders() {
  const query = await input({
    message: "Search query:",
    validate: (val) => (val.length > 0 ? true : "Query required"),
  });

  console.log("\nSearching reminders...");
  const results = searchReminders(query);

  if (results.length === 0) {
    console.log("No matching reminders found.\n");
    return;
  }

  console.log(`\n--- Found ${results.length} Reminder(s) ---`);
  results.forEach((reminder, i) => {
    const status = reminder.completed ? "[✓]" : "[ ]";
    console.log(`${i + 1}. ${status} ${reminder.name}`);
    if (reminder.body) console.log(`   ${reminder.body}`);
    if (reminder.dueDate) console.log(`   Due: ${reminder.dueDate}`);
  });
  console.log("");
}

async function handleViewLists() {
  console.log("\nFetching lists...");
  const lists = getLists();

  if (lists.length === 0) {
    console.log("No reminder lists found.\n");
    return;
  }

  console.log("\n--- Reminder Lists ---");
  lists.forEach((list, i) => {
    console.log(`${i + 1}. ${list.name}`);
  });
  console.log("");
}

async function handleCreateList() {
  const name = await input({
    message: "List name:",
    validate: (val) => (val.length > 0 ? true : "Name required"),
  });

  console.log("\nCreating list...");
  const success = createList(name);

  if (success) {
    console.log("List created successfully!\n");
  } else {
    console.log("Failed to create list.\n");
  }
}

async function handleDeleteList() {
  const lists = getLists();

  if (lists.length === 0) {
    console.log("No reminder lists found.\n");
    return;
  }

  const selectedList = await select({
    message: "Select a list to delete:",
    choices: [
      ...lists.map((list) => ({
        name: list.name,
        value: list.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedList === "__back__") return;

  const confirmDelete = await confirm({
    message: `Delete list "${selectedList}" and all its reminders?`,
    default: false,
  });

  if (!confirmDelete) {
    console.log("Cancelled.\n");
    return;
  }

  console.log("\nDeleting list...");
  const success = deleteList(selectedList);

  if (success) {
    console.log("List deleted successfully!\n");
  } else {
    console.log("Failed to delete list.\n");
  }
}
