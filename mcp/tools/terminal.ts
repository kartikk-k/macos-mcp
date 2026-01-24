export const terminalTools = [
  {
    name: "terminal_new_window",
    description: "Create a new Terminal window",
    inputSchema: {
      type: "object" as const,
      properties: {
        command: {
          type: "string",
          description: "Command to execute in the new window",
        },
        workingDirectory: {
          type: "string",
          description: "Working directory for the new window",
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_get_windows",
    description: "Get all Terminal windows with their info",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "terminal_close_window",
    description: "Close a Terminal window",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_focus_window",
    description: "Bring a Terminal window to front",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_new_tab",
    description: "Create a new tab in Terminal",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        command: {
          type: "string",
          description: "Command to execute in the new tab",
        },
        workingDirectory: {
          type: "string",
          description: "Working directory for the new tab",
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_get_tabs",
    description: "Get all tabs in a Terminal window",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_get_active_tab",
    description: "Get the currently active tab info",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "terminal_close_tab",
    description: "Close a specific tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_set_active_tab",
    description: "Switch to a specific tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
        },
      },
      required: ["windowIndex", "tabIndex"],
    },
  },
  {
    name: "terminal_execute_command",
    description: "Execute a command in a Terminal tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        command: {
          type: "string",
          description: "Command to execute",
        },
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
        waitForCompletion: {
          type: "boolean",
          description: "Wait for command to complete",
          default: false,
        },
      },
      required: ["command"],
    },
  },
  {
    name: "terminal_execute_in_active_tab",
    description: "Execute a command in the currently active tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        command: {
          type: "string",
          description: "Command to execute",
        },
      },
      required: ["command"],
    },
  },
  {
    name: "terminal_get_current_directory",
    description: "Get the current working directory of a tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_get_processes",
    description: "Get running processes in a tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_is_busy",
    description: "Check if a tab is currently running a command",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_get_contents",
    description: "Get the text content from a Terminal tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
        lineLimit: {
          type: "number",
          description: "Limit number of lines returned",
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_get_selected_text",
    description: "Get the currently selected text in Terminal",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "terminal_clear",
    description: "Clear the screen in a Terminal tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_get_settings",
    description: "Get Terminal settings for a tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
      },
      required: [],
    },
  },
  {
    name: "terminal_set_profile",
    description: "Set the Terminal profile/theme for a tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        profileName: {
          type: "string",
          description: "Name of the Terminal profile",
        },
        windowIndex: {
          type: "number",
          description: "Window index (1-based)",
          default: 1,
        },
        tabIndex: {
          type: "number",
          description: "Tab index (1-based)",
          default: 1,
        },
      },
      required: ["profileName"],
    },
  },
];
