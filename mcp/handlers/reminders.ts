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
} from "../../src/reminders";

export function handleRemindersTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "reminders_get_lists":
      return getLists();
    case "reminders_get_reminders":
      return getReminders((args as { listName?: string }).listName);
    case "reminders_create_reminder": {
      const reminderArgs = args as {
        name: string;
        body?: string;
        dueDate?: string;
        priority?: number;
        listName?: string;
      };
      return {
        success: createReminder({
          name: reminderArgs.name,
          body: reminderArgs.body,
          dueDate: reminderArgs.dueDate
            ? new Date(reminderArgs.dueDate)
            : undefined,
          priority: reminderArgs.priority,
          listName: reminderArgs.listName,
        }),
      };
    }
    case "reminders_complete_reminder":
      return {
        success: completeReminder(
          (args as { name: string; listName?: string }).name,
          (args as { name: string; listName?: string }).listName
        ),
      };
    case "reminders_delete_reminder":
      return {
        success: deleteReminder(
          (args as { name: string; listName?: string }).name,
          (args as { name: string; listName?: string }).listName
        ),
      };
    case "reminders_update": {
      const updateReminderArgs = args as {
        name: string;
        listName?: string;
        newName?: string;
        newBody?: string;
        newDueDate?: string;
        newPriority?: number;
      };
      return {
        success: updateReminder({
          name: updateReminderArgs.name,
          listName: updateReminderArgs.listName,
          newName: updateReminderArgs.newName,
          newBody: updateReminderArgs.newBody,
          newDueDate: updateReminderArgs.newDueDate
            ? new Date(updateReminderArgs.newDueDate)
            : undefined,
          newPriority: updateReminderArgs.newPriority,
        }),
      };
    }
    case "reminders_create_list":
      return { success: createList((args as { listName: string }).listName) };
    case "reminders_delete_list":
      return { success: deleteList((args as { listName: string }).listName) };
    case "reminders_search":
      return searchReminders((args as { query: string }).query);
    default:
      throw new Error(`Unknown reminders tool: ${name}`);
  }
}
