export const safariTools = [
  {
    name: "safari_get_all_tabs",
    description: "Get all open tabs in Safari across all windows",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_get_active_tab",
    description: "Get the currently active tab in Safari",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_open_url",
    description: "Open a URL in Safari",
    inputSchema: {
      type: "object" as const,
      properties: {
        url: {
          type: "string",
          description: "The URL to open",
        },
        newTab: {
          type: "boolean",
          description: "Open in a new tab (default: true)",
          default: true,
        },
      },
      required: ["url"],
    },
  },
  {
    name: "safari_close_tab",
    description: "Close a specific tab in Safari",
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
    name: "safari_close_active_tab",
    description: "Close the currently active tab in Safari",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_set_active_tab",
    description: "Switch to a specific tab in Safari",
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
    name: "safari_reload_tab",
    description: "Reload a specific tab in Safari",
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
    name: "safari_reload_active_tab",
    description: "Reload the currently active tab in Safari",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_get_windows",
    description: "Get all Safari windows with their info",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_new_window",
    description: "Open a new Safari window",
    inputSchema: {
      type: "object" as const,
      properties: {
        url: {
          type: "string",
          description: "URL to open (optional)",
        },
      },
      required: [],
    },
  },
  {
    name: "safari_close_window",
    description: "Close a Safari window",
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
    name: "safari_focus_window",
    description: "Focus a Safari window",
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
    name: "safari_go_back",
    description: "Navigate back in a Safari tab",
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
    name: "safari_go_forward",
    description: "Navigate forward in a Safari tab",
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
    name: "safari_execute_javascript",
    description: "Execute JavaScript in a Safari tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        javascript: {
          type: "string",
          description: "JavaScript code to execute",
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
      required: ["javascript"],
    },
  },
  {
    name: "safari_get_page_text",
    description: "Get the text content of the current Safari page",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_get_page_title",
    description: "Get the title of the current Safari page",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_get_page_source",
    description: "Get the HTML source of the current Safari page",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_get_current_url",
    description: "Get the URL of the current Safari tab",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "safari_click_element",
    description: "Click an element on the Safari page using a CSS selector",
    inputSchema: {
      type: "object" as const,
      properties: {
        selector: {
          type: "string",
          description: "CSS selector for the element to click",
        },
      },
      required: ["selector"],
    },
  },
  {
    name: "safari_fill_input",
    description: "Fill an input field on the Safari page",
    inputSchema: {
      type: "object" as const,
      properties: {
        selector: {
          type: "string",
          description: "CSS selector for the input element",
        },
        value: {
          type: "string",
          description: "Value to fill in",
        },
      },
      required: ["selector", "value"],
    },
  },
  {
    name: "safari_scroll",
    description: "Scroll the Safari page",
    inputSchema: {
      type: "object" as const,
      properties: {
        direction: {
          type: "string",
          enum: ["top", "bottom", "position"],
          description: "Scroll direction or 'position' for specific coordinates",
        },
        x: {
          type: "number",
          description: "X coordinate (only for direction='position')",
        },
        y: {
          type: "number",
          description: "Y coordinate (only for direction='position')",
        },
      },
      required: ["direction"],
    },
  },
  {
    name: "safari_navigate_to_url",
    description: "Navigate to a URL in the current Safari tab",
    inputSchema: {
      type: "object" as const,
      properties: {
        url: {
          type: "string",
          description: "URL to navigate to",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "safari_search_web",
    description: "Search the web using Safari",
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
  {
    name: "safari_show_bookmarks",
    description: "Show Safari bookmarks",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];
