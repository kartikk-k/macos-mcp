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
