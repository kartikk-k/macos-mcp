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
  createFolder,
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
