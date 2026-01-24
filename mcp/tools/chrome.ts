export const chromeTools = [
  {
    name: "chrome_get_all_tabs",
    description: "Get all open tabs in Chrome across all windows",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "chrome_get_active_tab",
    description: "Get the currently active tab in Chrome",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "chrome_open_url",
    description: "Open a URL in Chrome",
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
    name: "chrome_close_tab",
    description: "Close a specific tab in Chrome",
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
    name: "chrome_close_active_tab",
    description: "Close the currently active tab in Chrome",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "chrome_set_active_tab",
    description: "Switch to a specific tab in Chrome",
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
    name: "chrome_reload_tab",
    description: "Reload a specific tab in Chrome",
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
    name: "chrome_reload_active_tab",
    description: "Reload the currently active tab in Chrome",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "chrome_get_windows",
    description: "Get all Chrome windows with their info",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "chrome_new_window",
    description: "Open a new Chrome window",
    inputSchema: {
      type: "object" as const,
      properties: {
        url: {
          type: "string",
          description: "URL to open (optional)",
        },
        incognito: {
          type: "boolean",
          description: "Open in incognito mode",
          default: false,
        },
      },
      required: [],
    },
  },
  {
    name: "chrome_close_window",
    description: "Close a Chrome window",
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
    name: "chrome_go_back",
    description: "Navigate back in a Chrome tab",
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
    name: "chrome_go_forward",
    description: "Navigate forward in a Chrome tab",
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
    name: "chrome_execute_javascript",
    description: "Execute JavaScript in a Chrome tab",
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
    name: "chrome_get_page_text",
    description: "Get the text content of the current page",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "chrome_get_page_title",
    description: "Get the title of the current page",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "chrome_get_page_source",
    description: "Get the HTML source of the current page",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "chrome_click_element",
    description: "Click an element on the page using a CSS selector",
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
    name: "chrome_fill_input",
    description: "Fill an input field on the page",
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
    name: "chrome_scroll",
    description: "Scroll the page",
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
];
