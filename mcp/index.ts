// Import audio functions
import {
  getVolumeSettings,
  getVolume,
  setVolume,
  isMuted,
  mute,
  unmute,
  toggleMute,
  beep,
} from "../src/audio";

// Import mail functions
import {
  getAccounts,
  getMails,
  composeMail,
  searchMails,
  checkMail,
  getUnreadCount,
  getTotalUnreadCount,
} from "../src/mail";

// Import finder functions
import {
  openPath,
  revealInFinder,
  moveToTrash,
  emptyTrash,
  duplicateFile,
  moveFile,
  copyFile,
  renameFile,
  ejectVolume,
  getSelection,
  getCurrentFolder,
  getDesktopPicture,
  setDesktopPicture,
  getFileInfo,
  getDisks,
} from "../src/finder";

// Import chrome functions
import {
  getAllTabs,
  getActiveTab,
  openUrl,
  closeTab,
  closeActiveTab,
  setActiveTab,
  reloadTab,
  reloadActiveTab,
  getWindows,
  newWindow,
  closeWindow,
  focusWindow,
  goBack,
  goForward,
  goBackActiveTab,
  goForwardActiveTab,
  executeJavaScript,
  executeJavaScriptInActiveTab,
  getPageSource,
  getPageText,
  getPageTitle,
  clickElement,
  fillInput,
  scrollTo,
  scrollToBottom,
  scrollToTop,
} from "../src/chrome";

// Import safari functions
import {
  getAllTabs as safariGetAllTabs,
  getActiveTab as safariGetActiveTab,
  openUrl as safariOpenUrl,
  closeTab as safariCloseTab,
  closeActiveTab as safariCloseActiveTab,
  setActiveTab as safariSetActiveTab,
  reloadTab as safariReloadTab,
  reloadActiveTab as safariReloadActiveTab,
  getWindows as safariGetWindows,
  newWindow as safariNewWindow,
  closeWindow as safariCloseWindow,
  focusWindow as safariFocusWindow,
  goBack as safariGoBack,
  goForward as safariGoForward,
  goBackActiveTab as safariGoBackActiveTab,
  goForwardActiveTab as safariGoForwardActiveTab,
  executeJavaScript as safariExecuteJavaScript,
  executeJavaScriptInActiveTab as safariExecuteJavaScriptInActiveTab,
  getPageSource as safariGetPageSource,
  getPageText as safariGetPageText,
  getPageTitle as safariGetPageTitle,
  getCurrentUrl as safariGetCurrentUrl,
  clickElement as safariClickElement,
  fillInput as safariFillInput,
  scrollTo as safariScrollTo,
  scrollToBottom as safariScrollToBottom,
  scrollToTop as safariScrollToTop,
  navigateToUrl as safariNavigateToUrl,
  searchWeb,
  showBookmarks,
} from "../src/safari";

// Import calendar functions
import {
  listCalendars,
  listEvents,
  createEvent,
  deleteEvent,
} from "../src/calendar";

// Import reminders functions
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
} from "../src/reminders";

// Import notes functions
import {
  listFolders,
  listNotes,
  createNote,
  deleteNote,
  updateNote,
  searchNotes,
  createFolder,
  moveNote,
  getNote,
  deleteFolder,
  getFolderInfo,
  searchInFolder,
  searchByTitle,
} from "../src/notes";

// Import contacts functions
import {
  listPeople,
  createContact,
  deleteContact,
  listGroups,
  searchContacts,
  updateContact,
  addToGroup,
} from "../src/contacts";

// Import terminal functions
import {
  getWindows as getTerminalWindows,
  newWindow as newTerminalWindow,
  closeWindow as closeTerminalWindow,
  focusWindow as focusTerminalWindow,
  getTabs,
  getActiveTab as getActiveTerminalTab,
  newTab,
  closeTab as closeTerminalTab,
  setActiveTab as setActiveTerminalTab,
  executeCommand,
  executeInActiveTab,
  getCurrentDirectory,
  getProcesses,
  isBusy,
  getContents,
  getSelectedText,
  clear,
  getSettings,
  setProfile,
} from "../src/terminal";

// Tool definitions
export const tools = [
  // Audio tools
  {
    name: "get_volume_settings",
    description:
      "Get all macOS volume settings including output volume, input volume, alert volume, and mute status",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "get_volume",
    description: "Get the current output volume level (0-100)",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "set_volume",
    description: "Set the output volume level",
    inputSchema: {
      type: "object" as const,
      properties: {
        level: {
          type: "number",
          description: "Volume level from 0 to 100",
          minimum: 0,
          maximum: 100,
        },
      },
      required: ["level"],
    },
  },
  {
    name: "is_muted",
    description: "Check if the audio output is currently muted",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "mute",
    description: "Mute the audio output",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "unmute",
    description: "Unmute the audio output",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "toggle_mute",
    description:
      "Toggle the mute state of audio output. Returns true if now muted, false if now unmuted",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "beep",
    description: "Play the system beep sound",
    inputSchema: {
      type: "object" as const,
      properties: {
        times: {
          type: "number",
          description: "Number of times to beep (1-10)",
          minimum: 1,
          maximum: 10,
          default: 1,
        },
      },
      required: [],
    },
  },
  // Mail tools
  {
    name: "get_mail_accounts",
    description: "Get a list of all configured mail accounts in Apple Mail",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "get_mails",
    description: "Get emails from the inbox of a specified mail account",
    inputSchema: {
      type: "object" as const,
      properties: {
        accountName: {
          type: "string",
          description: "Name of the mail account",
        },
        count: {
          type: "number",
          description: "Number of emails to retrieve",
          default: 10,
        },
      },
      required: ["accountName"],
    },
  },
  {
    name: "compose_mail",
    description: "Compose a new email in Apple Mail",
    inputSchema: {
      type: "object" as const,
      properties: {
        to: {
          type: "array",
          items: { type: "string" },
          description: "Array of recipient email addresses",
        },
        subject: {
          type: "string",
          description: "Email subject line",
        },
        body: {
          type: "string",
          description: "Email body content",
        },
        cc: {
          type: "array",
          items: { type: "string" },
          description: "Array of CC recipient email addresses",
        },
        bcc: {
          type: "array",
          items: { type: "string" },
          description: "Array of BCC recipient email addresses",
        },
        attachments: {
          type: "array",
          items: { type: "string" },
          description: "Array of file paths to attach",
        },
        sendImmediately: {
          type: "boolean",
          description:
            "If true, send the email immediately. If false, open as draft",
          default: false,
        },
      },
      required: ["to", "subject", "body"],
    },
  },
  {
    name: "search_mails",
    description: "Search for emails in a mail account",
    inputSchema: {
      type: "object" as const,
      properties: {
        accountName: {
          type: "string",
          description: "Name of the mail account to search in",
        },
        query: {
          type: "string",
          description: "Search query string",
        },
        field: {
          type: "string",
          enum: ["subject", "sender", "content"],
          description: "Field to search in",
          default: "subject",
        },
        maxResults: {
          type: "number",
          description: "Maximum number of results to return",
          default: 20,
        },
      },
      required: ["accountName", "query"],
    },
  },
  {
    name: "check_mail",
    description: "Check for new mail in Apple Mail",
    inputSchema: {
      type: "object" as const,
      properties: {
        accountName: {
          type: "string",
          description:
            "Name of the account to check. If not provided, checks all accounts",
        },
      },
      required: [],
    },
  },
  {
    name: "get_unread_count",
    description: "Get unread email counts per mailbox",
    inputSchema: {
      type: "object" as const,
      properties: {
        accountName: {
          type: "string",
          description:
            "Name of the account. If not provided, gets counts for all accounts",
        },
      },
      required: [],
    },
  },
  {
    name: "get_total_unread_count",
    description: "Get the total number of unread emails",
    inputSchema: {
      type: "object" as const,
      properties: {
        accountName: {
          type: "string",
          description:
            "Name of the account. If not provided, gets total for all accounts",
        },
      },
      required: [],
    },
  },
  // Finder tools
  {
    name: "finder_open_path",
    description: "Open a file or folder in Finder",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to open",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_reveal",
    description: "Reveal a file or folder in Finder (show in enclosing folder)",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to reveal",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_create_folder",
    description: "Create a new folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        parentPath: {
          type: "string",
          description: "The parent directory path",
        },
        folderName: {
          type: "string",
          description: "Name of the new folder",
        },
      },
      required: ["parentPath", "folderName"],
    },
  },
  {
    name: "finder_move_to_trash",
    description: "Move a file or folder to the trash",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to move to trash",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_empty_trash",
    description: "Empty the trash (permanently delete all items)",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "finder_duplicate",
    description: "Duplicate a file or folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to duplicate",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_move",
    description: "Move a file or folder to a new location",
    inputSchema: {
      type: "object" as const,
      properties: {
        sourcePath: {
          type: "string",
          description: "The source file path",
        },
        destinationFolder: {
          type: "string",
          description: "The destination folder path",
        },
      },
      required: ["sourcePath", "destinationFolder"],
    },
  },
  {
    name: "finder_copy",
    description: "Copy a file or folder to a new location",
    inputSchema: {
      type: "object" as const,
      properties: {
        sourcePath: {
          type: "string",
          description: "The source file path",
        },
        destinationFolder: {
          type: "string",
          description: "The destination folder path",
        },
      },
      required: ["sourcePath", "destinationFolder"],
    },
  },
  {
    name: "finder_rename",
    description: "Rename a file or folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to rename",
        },
        newName: {
          type: "string",
          description: "The new name",
        },
      },
      required: ["path", "newName"],
    },
  },
  {
    name: "finder_eject",
    description: "Eject a volume/disk",
    inputSchema: {
      type: "object" as const,
      properties: {
        volumeName: {
          type: "string",
          description: "The name of the volume to eject",
        },
      },
      required: ["volumeName"],
    },
  },
  {
    name: "finder_get_selection",
    description: "Get the currently selected items in Finder",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "finder_get_current_folder",
    description: "Get the path of the frontmost Finder window's current folder",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "finder_get_desktop_picture",
    description: "Get the current desktop wallpaper path",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "finder_set_desktop_picture",
    description: "Set the desktop wallpaper",
    inputSchema: {
      type: "object" as const,
      properties: {
        imagePath: {
          type: "string",
          description: "Path to the image file",
        },
      },
      required: ["imagePath"],
    },
  },
  {
    name: "finder_get_file_info",
    description: "Get information about a file or folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "The path to get info for",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "finder_get_disks",
    description: "Get a list of all mounted disks/volumes",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  // Chrome tools
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
  // Safari tools
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
  // Calendar tools
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
  // Reminders tools
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
  // Notes tools
  {
    name: "notes_list_folders",
    description: "List all Notes folders",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "notes_list_notes",
    description: "List notes from a folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        folderName: {
          type: "string",
          description: "Name of the folder (optional, defaults to default folder)",
        },
      },
      required: [],
    },
  },
  {
    name: "notes_create_note",
    description: "Create a new note",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Note title",
        },
        body: {
          type: "string",
          description: "Note content (HTML supported)",
        },
        folderName: {
          type: "string",
          description: "Name of the folder to create the note in",
        },
      },
      required: ["name", "body"],
    },
  },
  {
    name: "notes_delete_note",
    description: "Delete a note",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Note title",
        },
        folderName: {
          type: "string",
          description: "Name of the folder (optional)",
        },
      },
      required: ["name"],
    },
  },
  // Contacts tools
  {
    name: "contacts_list_people",
    description: "List all contacts",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "contacts_create_contact",
    description: "Create a new contact",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: {
          type: "string",
          description: "First name",
        },
        lastName: {
          type: "string",
          description: "Last name",
        },
        organization: {
          type: "string",
          description: "Company/organization",
        },
        emails: {
          type: "array",
          items: { type: "string" },
          description: "Email addresses",
        },
        phones: {
          type: "array",
          items: { type: "string" },
          description: "Phone numbers",
        },
      },
      required: ["firstName"],
    },
  },
  {
    name: "contacts_delete_contact",
    description: "Delete a contact",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: {
          type: "string",
          description: "First name",
        },
        lastName: {
          type: "string",
          description: "Last name (optional)",
        },
      },
      required: ["firstName"],
    },
  },
  {
    name: "contacts_list_groups",
    description: "List all contact groups",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "contacts_search",
    description: "Search for contacts by name, email, or organization",
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
    name: "contacts_update",
    description: "Update an existing contact",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: {
          type: "string",
          description: "Current first name",
        },
        lastName: {
          type: "string",
          description: "Current last name (optional for search)",
        },
        newFirstName: {
          type: "string",
          description: "New first name",
        },
        newLastName: {
          type: "string",
          description: "New last name",
        },
        newOrganization: {
          type: "string",
          description: "New organization",
        },
        newEmails: {
          type: "array",
          items: { type: "string" },
          description: "New email addresses (replaces all existing)",
        },
        newPhones: {
          type: "array",
          items: { type: "string" },
          description: "New phone numbers (replaces all existing)",
        },
      },
      required: ["firstName"],
    },
  },
  {
    name: "contacts_add_to_group",
    description: "Add a contact to a group",
    inputSchema: {
      type: "object" as const,
      properties: {
        firstName: {
          type: "string",
          description: "Contact first name",
        },
        lastName: {
          type: "string",
          description: "Contact last name (optional)",
        },
        groupName: {
          type: "string",
          description: "Name of the group",
        },
      },
      required: ["firstName", "groupName"],
    },
  },
  {
    name: "notes_update",
    description: "Update the content of an existing note",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Note title",
        },
        newBody: {
          type: "string",
          description: "New note content (HTML supported)",
        },
        folderName: {
          type: "string",
          description: "Name of the folder containing the note (optional)",
        },
      },
      required: ["name", "newBody"],
    },
  },
  {
    name: "notes_search",
    description: "Search for notes by title or content",
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
    name: "notes_create_folder",
    description: "Create a new Notes folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        folderName: {
          type: "string",
          description: "Name of the folder to create",
        },
      },
      required: ["folderName"],
    },
  },
  {
    name: "notes_move",
    description: "Move a note to a different folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        noteName: {
          type: "string",
          description: "Name of the note to move",
        },
        sourceFolderName: {
          type: "string",
          description: "Source folder (optional, defaults to default folder)",
        },
        targetFolderName: {
          type: "string",
          description: "Target folder to move the note to",
        },
      },
      required: ["noteName", "targetFolderName"],
    },
  },
  {
    name: "notes_get",
    description: "Get details of a specific note",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Note title",
        },
        folderName: {
          type: "string",
          description: "Folder name (optional, defaults to default folder)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "notes_delete_folder",
    description: "Delete a Notes folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        folderName: {
          type: "string",
          description: "Name of the folder to delete",
        },
      },
      required: ["folderName"],
    },
  },
  {
    name: "notes_get_folder_info",
    description: "Get information about a folder (name and note count)",
    inputSchema: {
      type: "object" as const,
      properties: {
        folderName: {
          type: "string",
          description: "Name of the folder",
        },
      },
      required: ["folderName"],
    },
  },
  {
    name: "notes_search_in_folder",
    description: "Search for notes within a specific folder",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Search query",
        },
        folderName: {
          type: "string",
          description: "Name of the folder to search in",
        },
      },
      required: ["query", "folderName"],
    },
  },
  {
    name: "notes_search_by_title",
    description: "Search for notes by title only (faster than full-text search)",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Title search query",
        },
      },
      required: ["query"],
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
  // Terminal tools
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

export type ToolResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
};

export function handleToolCall(
  name: string,
  args: Record<string, unknown>
): ToolResult {
  try {
    let result: unknown;

    switch (name) {
      // Audio tools
      case "get_volume_settings":
        result = getVolumeSettings();
        break;
      case "get_volume":
        result = getVolume();
        break;
      case "set_volume":
        setVolume((args as { level: number }).level);
        result = { success: true, level: (args as { level: number }).level };
        break;
      case "is_muted":
        result = { muted: isMuted() };
        break;
      case "mute":
        mute();
        result = { success: true, muted: true };
        break;
      case "unmute":
        unmute();
        result = { success: true, muted: false };
        break;
      case "toggle_mute":
        result = { muted: toggleMute() };
        break;
      case "beep":
        beep((args as { times?: number }).times);
        result = { success: true };
        break;

      // Mail tools
      case "get_mail_accounts":
        result = getAccounts();
        break;
      case "get_mails":
        result = getMails(
          (args as { accountName: string; count?: number }).accountName,
          (args as { accountName: string; count?: number }).count
        );
        break;
      case "compose_mail": {
        const composeArgs = args as {
          to: string[];
          subject: string;
          body: string;
          cc?: string[];
          bcc?: string[];
          attachments?: string[];
          sendImmediately?: boolean;
        };
        result = {
          success: composeMail({
            to: composeArgs.to,
            subject: composeArgs.subject,
            body: composeArgs.body,
            cc: composeArgs.cc,
            bcc: composeArgs.bcc,
            attachments: composeArgs.attachments,
            sendImmediately: composeArgs.sendImmediately,
          }),
        };
        break;
      }
      case "search_mails": {
        const searchArgs = args as {
          accountName: string;
          query: string;
          field?: "subject" | "sender" | "content";
          maxResults?: number;
        };
        result = searchMails(
          searchArgs.accountName,
          searchArgs.query,
          searchArgs.field,
          searchArgs.maxResults
        );
        break;
      }
      case "check_mail":
        result = {
          success: checkMail((args as { accountName?: string }).accountName),
        };
        break;
      case "get_unread_count":
        result = getUnreadCount((args as { accountName?: string }).accountName);
        break;
      case "get_total_unread_count":
        result = {
          total: getTotalUnreadCount(
            (args as { accountName?: string }).accountName
          ),
        };
        break;

      // Finder tools
      case "finder_open_path":
        result = { success: openPath((args as { path: string }).path) };
        break;
      case "finder_reveal":
        result = { success: revealInFinder((args as { path: string }).path) };
        break;
      case "finder_create_folder":
        result = {
          success: createFolder(
            (args as { parentPath: string; folderName: string }).parentPath,
            (args as { parentPath: string; folderName: string }).folderName
          ),
        };
        break;
      case "finder_move_to_trash":
        result = { success: moveToTrash((args as { path: string }).path) };
        break;
      case "finder_empty_trash":
        result = { success: emptyTrash() };
        break;
      case "finder_duplicate":
        result = { success: duplicateFile((args as { path: string }).path) };
        break;
      case "finder_move":
        result = {
          success: moveFile(
            (args as { sourcePath: string; destinationFolder: string }).sourcePath,
            (args as { sourcePath: string; destinationFolder: string }).destinationFolder
          ),
        };
        break;
      case "finder_copy":
        result = {
          success: copyFile(
            (args as { sourcePath: string; destinationFolder: string }).sourcePath,
            (args as { sourcePath: string; destinationFolder: string }).destinationFolder
          ),
        };
        break;
      case "finder_rename":
        result = {
          success: renameFile(
            (args as { path: string; newName: string }).path,
            (args as { path: string; newName: string }).newName
          ),
        };
        break;
      case "finder_eject":
        result = { success: ejectVolume((args as { volumeName: string }).volumeName) };
        break;
      case "finder_get_selection":
        result = getSelection();
        break;
      case "finder_get_current_folder":
        result = { path: getCurrentFolder() };
        break;
      case "finder_get_desktop_picture":
        result = { path: getDesktopPicture() };
        break;
      case "finder_set_desktop_picture":
        result = { success: setDesktopPicture((args as { imagePath: string }).imagePath) };
        break;
      case "finder_get_file_info":
        result = getFileInfo((args as { path: string }).path);
        break;
      case "finder_get_disks":
        result = { disks: getDisks() };
        break;

      // Chrome tools
      case "chrome_get_all_tabs":
        result = getAllTabs();
        break;
      case "chrome_get_active_tab":
        result = getActiveTab();
        break;
      case "chrome_open_url":
        result = {
          success: openUrl(
            (args as { url: string; newTab?: boolean }).url,
            (args as { url: string; newTab?: boolean }).newTab ?? true
          ),
        };
        break;
      case "chrome_close_tab":
        result = {
          success: closeTab(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "chrome_close_active_tab":
        result = { success: closeActiveTab() };
        break;
      case "chrome_set_active_tab":
        result = {
          success: setActiveTab(
            (args as { windowIndex: number; tabIndex: number }).windowIndex,
            (args as { windowIndex: number; tabIndex: number }).tabIndex
          ),
        };
        break;
      case "chrome_reload_tab":
        result = {
          success: reloadTab(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "chrome_reload_active_tab":
        result = { success: reloadActiveTab() };
        break;
      case "chrome_get_windows":
        result = getWindows();
        break;
      case "chrome_new_window":
        result = {
          success: newWindow(
            (args as { url?: string; incognito?: boolean }).url,
            (args as { url?: string; incognito?: boolean }).incognito ?? false
          ),
        };
        break;
      case "chrome_close_window":
        result = {
          success: closeWindow(
            (args as { windowIndex?: number }).windowIndex ?? 1
          ),
        };
        break;
      case "chrome_go_back":
        result = {
          success: goBack(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "chrome_go_forward":
        result = {
          success: goForward(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "chrome_execute_javascript": {
        const jsArgs = args as {
          javascript: string;
          windowIndex?: number;
          tabIndex?: number;
        };
        result = {
          result: executeJavaScript(
            jsArgs.javascript,
            jsArgs.windowIndex ?? 1,
            jsArgs.tabIndex ?? 1
          ),
        };
        break;
      }
      case "chrome_get_page_text":
        result = { text: getPageText() };
        break;
      case "chrome_get_page_title":
        result = { title: getPageTitle() };
        break;
      case "chrome_get_page_source":
        result = { source: getPageSource() };
        break;
      case "chrome_click_element":
        result = { result: clickElement((args as { selector: string }).selector) };
        break;
      case "chrome_fill_input":
        result = {
          result: fillInput(
            (args as { selector: string; value: string }).selector,
            (args as { selector: string; value: string }).value
          ),
        };
        break;
      case "chrome_scroll": {
        const scrollArgs = args as {
          direction: "top" | "bottom" | "position";
          x?: number;
          y?: number;
        };
        if (scrollArgs.direction === "top") {
          result = { result: scrollToTop() };
        } else if (scrollArgs.direction === "bottom") {
          result = { result: scrollToBottom() };
        } else {
          result = { result: scrollTo(scrollArgs.x ?? 0, scrollArgs.y ?? 0) };
        }
        break;
      }

      // Safari tools
      case "safari_get_all_tabs":
        result = safariGetAllTabs();
        break;
      case "safari_get_active_tab":
        result = safariGetActiveTab();
        break;
      case "safari_open_url":
        result = {
          success: safariOpenUrl(
            (args as { url: string; newTab?: boolean }).url,
            (args as { url: string; newTab?: boolean }).newTab ?? true
          ),
        };
        break;
      case "safari_close_tab":
        result = {
          success: safariCloseTab(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "safari_close_active_tab":
        result = { success: safariCloseActiveTab() };
        break;
      case "safari_set_active_tab":
        result = {
          success: safariSetActiveTab(
            (args as { windowIndex: number; tabIndex: number }).windowIndex,
            (args as { windowIndex: number; tabIndex: number }).tabIndex
          ),
        };
        break;
      case "safari_reload_tab":
        result = {
          success: safariReloadTab(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "safari_reload_active_tab":
        result = { success: safariReloadActiveTab() };
        break;
      case "safari_get_windows":
        result = safariGetWindows();
        break;
      case "safari_new_window":
        result = {
          success: safariNewWindow((args as { url?: string }).url),
        };
        break;
      case "safari_close_window":
        result = {
          success: safariCloseWindow(
            (args as { windowIndex?: number }).windowIndex ?? 1
          ),
        };
        break;
      case "safari_focus_window":
        result = {
          success: safariFocusWindow(
            (args as { windowIndex?: number }).windowIndex ?? 1
          ),
        };
        break;
      case "safari_go_back":
        result = {
          success: safariGoBack(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "safari_go_forward":
        result = {
          success: safariGoForward(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "safari_execute_javascript": {
        const safariJsArgs = args as {
          javascript: string;
          windowIndex?: number;
          tabIndex?: number;
        };
        result = {
          result: safariExecuteJavaScript(
            safariJsArgs.javascript,
            safariJsArgs.windowIndex ?? 1,
            safariJsArgs.tabIndex ?? 1
          ),
        };
        break;
      }
      case "safari_get_page_text":
        result = { text: safariGetPageText() };
        break;
      case "safari_get_page_title":
        result = { title: safariGetPageTitle() };
        break;
      case "safari_get_page_source":
        result = { source: safariGetPageSource() };
        break;
      case "safari_get_current_url":
        result = { url: safariGetCurrentUrl() };
        break;
      case "safari_click_element":
        result = { result: safariClickElement((args as { selector: string }).selector) };
        break;
      case "safari_fill_input":
        result = {
          result: safariFillInput(
            (args as { selector: string; value: string }).selector,
            (args as { selector: string; value: string }).value
          ),
        };
        break;
      case "safari_scroll": {
        const safariScrollArgs = args as {
          direction: "top" | "bottom" | "position";
          x?: number;
          y?: number;
        };
        if (safariScrollArgs.direction === "top") {
          result = { result: safariScrollToTop() };
        } else if (safariScrollArgs.direction === "bottom") {
          result = { result: safariScrollToBottom() };
        } else {
          result = { result: safariScrollTo(safariScrollArgs.x ?? 0, safariScrollArgs.y ?? 0) };
        }
        break;
      }
      case "safari_navigate_to_url":
        result = { success: safariNavigateToUrl((args as { url: string }).url) };
        break;
      case "safari_search_web":
        result = { success: searchWeb((args as { query: string }).query) };
        break;
      case "safari_show_bookmarks":
        result = { success: showBookmarks() };
        break;

      // Calendar tools
      case "calendar_list_calendars":
        result = listCalendars();
        break;
      case "calendar_list_events":
        result = listEvents(
          (args as { calendarName?: string; daysAhead?: number }).calendarName,
          (args as { calendarName?: string; daysAhead?: number }).daysAhead
        );
        break;
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
        result = {
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
        break;
      }
      case "calendar_delete_event":
        result = {
          success: deleteEvent(
            (args as { summary: string; calendarName?: string }).summary,
            (args as { summary: string; calendarName?: string }).calendarName
          ),
        };
        break;

      // Reminders tools
      case "reminders_get_lists":
        result = getLists();
        break;
      case "reminders_get_reminders":
        result = getReminders((args as { listName?: string }).listName);
        break;
      case "reminders_create_reminder": {
        const reminderArgs = args as {
          name: string;
          body?: string;
          dueDate?: string;
          priority?: number;
          listName?: string;
        };
        result = {
          success: createReminder({
            name: reminderArgs.name,
            body: reminderArgs.body,
            dueDate: reminderArgs.dueDate ? new Date(reminderArgs.dueDate) : undefined,
            priority: reminderArgs.priority,
            listName: reminderArgs.listName,
          }),
        };
        break;
      }
      case "reminders_complete_reminder":
        result = {
          success: completeReminder(
            (args as { name: string; listName?: string }).name,
            (args as { name: string; listName?: string }).listName
          ),
        };
        break;
      case "reminders_delete_reminder":
        result = {
          success: deleteReminder(
            (args as { name: string; listName?: string }).name,
            (args as { name: string; listName?: string }).listName
          ),
        };
        break;

      // Notes tools
      case "notes_list_folders":
        result = listFolders();
        break;
      case "notes_list_notes":
        result = listNotes((args as { folderName?: string }).folderName);
        break;
      case "notes_create_note": {
        const noteArgs = args as {
          name: string;
          body: string;
          folderName?: string;
        };
        result = {
          success: createNote({
            name: noteArgs.name,
            body: noteArgs.body,
            folderName: noteArgs.folderName,
          }),
        };
        break;
      }
      case "notes_delete_note":
        result = {
          success: deleteNote(
            (args as { name: string; folderName?: string }).name,
            (args as { name: string; folderName?: string }).folderName
          ),
        };
        break;

      // Contacts tools
      case "contacts_list_people":
        result = listPeople();
        break;
      case "contacts_create_contact": {
        const contactArgs = args as {
          firstName: string;
          lastName?: string;
          organization?: string;
          emails?: string[];
          phones?: string[];
        };
        result = {
          success: createContact({
            firstName: contactArgs.firstName,
            lastName: contactArgs.lastName,
            organization: contactArgs.organization,
            emails: contactArgs.emails,
            phones: contactArgs.phones,
          }),
        };
        break;
      }
      case "contacts_delete_contact":
        result = {
          success: deleteContact(
            (args as { firstName: string; lastName?: string }).firstName,
            (args as { firstName: string; lastName?: string }).lastName
          ),
        };
        break;
      case "contacts_list_groups":
        result = listGroups();
        break;
      case "contacts_search":
        result = searchContacts((args as { query: string }).query);
        break;
      case "contacts_update": {
        const updateContactArgs = args as {
          firstName: string;
          lastName?: string;
          newFirstName?: string;
          newLastName?: string;
          newOrganization?: string;
          newEmails?: string[];
          newPhones?: string[];
        };
        result = {
          success: updateContact({
            firstName: updateContactArgs.firstName,
            lastName: updateContactArgs.lastName,
            newFirstName: updateContactArgs.newFirstName,
            newLastName: updateContactArgs.newLastName,
            newOrganization: updateContactArgs.newOrganization,
            newEmails: updateContactArgs.newEmails,
            newPhones: updateContactArgs.newPhones,
          }),
        };
        break;
      }
      case "contacts_add_to_group":
        result = {
          success: addToGroup(
            (args as { firstName: string; lastName?: string; groupName: string }).firstName,
            (args as { firstName: string; lastName?: string; groupName: string }).lastName,
            (args as { firstName: string; lastName?: string; groupName: string }).groupName
          ),
        };
        break;
      case "notes_update":
        result = {
          success: updateNote(
            (args as { name: string; newBody: string; folderName?: string }).name,
            (args as { name: string; newBody: string; folderName?: string }).newBody,
            (args as { name: string; newBody: string; folderName?: string }).folderName
          ),
        };
        break;
      case "notes_search":
        result = searchNotes((args as { query: string }).query);
        break;
      case "notes_create_folder":
        result = { success: createFolder((args as { folderName: string }).folderName) };
        break;
      case "notes_move":
        result = {
          success: moveNote(
            (args as { noteName: string; sourceFolderName?: string; targetFolderName: string }).noteName,
            (args as { noteName: string; sourceFolderName?: string; targetFolderName: string }).sourceFolderName,
            (args as { noteName: string; sourceFolderName?: string; targetFolderName: string }).targetFolderName
          ),
        };
        break;
      case "notes_get":
        result = getNote(
          (args as { name: string; folderName?: string }).name,
          (args as { name: string; folderName?: string }).folderName
        );
        break;
      case "notes_delete_folder":
        result = { success: deleteFolder((args as { folderName: string }).folderName) };
        break;
      case "notes_get_folder_info":
        result = getFolderInfo((args as { folderName: string }).folderName);
        break;
      case "notes_search_in_folder":
        result = searchInFolder(
          (args as { query: string; folderName: string }).query,
          (args as { query: string; folderName: string }).folderName
        );
        break;
      case "notes_search_by_title":
        result = searchByTitle((args as { query: string }).query);
        break;
      case "reminders_update": {
        const updateReminderArgs = args as {
          name: string;
          listName?: string;
          newName?: string;
          newBody?: string;
          newDueDate?: string;
          newPriority?: number;
        };
        result = {
          success: updateReminder({
            name: updateReminderArgs.name,
            listName: updateReminderArgs.listName,
            newName: updateReminderArgs.newName,
            newBody: updateReminderArgs.newBody,
            newDueDate: updateReminderArgs.newDueDate ? new Date(updateReminderArgs.newDueDate) : undefined,
            newPriority: updateReminderArgs.newPriority,
          }),
        };
        break;
      }
      case "reminders_create_list":
        result = { success: createList((args as { listName: string }).listName) };
        break;
      case "reminders_delete_list":
        result = { success: deleteList((args as { listName: string }).listName) };
        break;
      case "reminders_search":
        result = searchReminders((args as { query: string }).query);
        break;

      // Terminal tools
      case "terminal_new_window":
        result = {
          success: newTerminalWindow(
            (args as { command?: string; workingDirectory?: string }).command,
            (args as { command?: string; workingDirectory?: string })
              .workingDirectory
          ),
        };
        break;
      case "terminal_get_windows":
        result = getTerminalWindows();
        break;
      case "terminal_close_window":
        result = {
          success: closeTerminalWindow(
            (args as { windowIndex?: number }).windowIndex ?? 1
          ),
        };
        break;
      case "terminal_focus_window":
        result = {
          success: focusTerminalWindow(
            (args as { windowIndex?: number }).windowIndex ?? 1
          ),
        };
        break;
      case "terminal_new_tab":
        result = {
          success: newTab(
            (args as { windowIndex?: number; command?: string; workingDirectory?: string })
              .windowIndex,
            (args as { windowIndex?: number; command?: string; workingDirectory?: string })
              .command,
            (args as { windowIndex?: number; command?: string; workingDirectory?: string })
              .workingDirectory
          ),
        };
        break;
      case "terminal_get_tabs":
        result = getTabs((args as { windowIndex?: number }).windowIndex ?? 1);
        break;
      case "terminal_get_active_tab":
        result = getActiveTerminalTab();
        break;
      case "terminal_close_tab":
        result = {
          success: closeTerminalTab(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
              1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "terminal_set_active_tab":
        result = {
          success: setActiveTerminalTab(
            (args as { windowIndex: number; tabIndex: number }).windowIndex,
            (args as { windowIndex: number; tabIndex: number }).tabIndex
          ),
        };
        break;
      case "terminal_execute_command": {
        const terminalExecArgs = args as {
          command: string;
          windowIndex?: number;
          tabIndex?: number;
          waitForCompletion?: boolean;
        };
        result = {
          success: executeCommand(
            terminalExecArgs.command,
            terminalExecArgs.windowIndex ?? 1,
            terminalExecArgs.tabIndex ?? 1,
            terminalExecArgs.waitForCompletion ?? false
          ),
        };
        break;
      }
      case "terminal_execute_in_active_tab":
        result = {
          success: executeInActiveTab((args as { command: string }).command),
        };
        break;
      case "terminal_get_current_directory":
        result = {
          directory: getCurrentDirectory(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
              1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "terminal_get_processes":
        result = {
          processes: getProcesses(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
              1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "terminal_is_busy":
        result = isBusy(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        );
        break;
      case "terminal_get_contents":
        result = {
          contents: getContents(
            (args as { windowIndex?: number; tabIndex?: number; lineLimit?: number })
              .windowIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number; lineLimit?: number })
              .tabIndex ?? 1,
            (args as { windowIndex?: number; tabIndex?: number; lineLimit?: number })
              .lineLimit
          ),
        };
        break;
      case "terminal_get_selected_text":
        result = { text: getSelectedText() };
        break;
      case "terminal_clear":
        result = {
          success: clear(
            (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
              1,
            (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
          ),
        };
        break;
      case "terminal_get_settings":
        result = getSettings(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        );
        break;
      case "terminal_set_profile":
        result = {
          success: setProfile(
            (args as { profileName: string; windowIndex?: number; tabIndex?: number })
              .profileName,
            (args as { profileName: string; windowIndex?: number; tabIndex?: number })
              .windowIndex ?? 1,
            (args as { profileName: string; windowIndex?: number; tabIndex?: number })
              .tabIndex ?? 1
          ),
        };
        break;

      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
}
