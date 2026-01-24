export const mailTools = [
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
