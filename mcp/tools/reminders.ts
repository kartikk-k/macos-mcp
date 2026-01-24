export const remindersTools = [
  {
    name: "reminders_get_lists",
    description: "Get all reminder lists",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "reminders_get_reminders",
    description: "Get reminders from a list",
    inputSchema: {
      type: "object" as const,
      properties: {
        listName: {
          type: "string",
          description: "Name of the reminder list (optional, defaults to default list)",
        },
      },
      required: [],
    },
  },
  {
    name: "reminders_create_reminder",
    description: "Create a new reminder",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Reminder title",
        },
        body: {
          type: "string",
          description: "Reminder notes/body",
        },
        dueDate: {
          type: "string",
          description: "Due date (ISO 8601 format)",
        },
        priority: {
          type: "number",
          description: "Priority level (0-9, where 0 is no priority)",
          minimum: 0,
          maximum: 9,
          default: 0,
        },
        listName: {
          type: "string",
          description: "Name of the reminder list",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "reminders_complete_reminder",
    description: "Mark a reminder as completed",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Reminder title",
        },
        listName: {
          type: "string",
          description: "Name of the reminder list (optional)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "reminders_delete_reminder",
    description: "Delete a reminder",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Reminder title",
        },
        listName: {
          type: "string",
          description: "Name of the reminder list (optional)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "reminders_update",
    description: "Update an existing reminder",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Current reminder title",
        },
        listName: {
          type: "string",
          description: "Name of the list containing the reminder (optional)",
        },
        newName: {
          type: "string",
          description: "New reminder title",
        },
        newBody: {
          type: "string",
          description: "New reminder notes/body",
        },
        newDueDate: {
          type: "string",
          description: "New due date (ISO 8601 format)",
        },
        newPriority: {
          type: "number",
          description: "New priority level (0-9)",
          minimum: 0,
          maximum: 9,
        },
      },
      required: ["name"],
    },
  },
  {
    name: "reminders_create_list",
    description: "Create a new reminder list",
    inputSchema: {
      type: "object" as const,
      properties: {
        listName: {
          type: "string",
          description: "Name of the list to create",
        },
      },
      required: ["listName"],
    },
  },
  {
    name: "reminders_delete_list",
    description: "Delete a reminder list",
    inputSchema: {
      type: "object" as const,
      properties: {
        listName: {
          type: "string",
          description: "Name of the list to delete",
        },
      },
      required: ["listName"],
    },
  },
  {
    name: "reminders_search",
    description: "Search for reminders by title or body",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Search query",
        },
      },
      required: ["query"],
    },
  },
];
