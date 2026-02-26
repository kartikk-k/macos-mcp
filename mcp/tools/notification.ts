export const notificationTools = [
  {
    name: "send_notification",
    description:
      "Display a native macOS notification with title, message, optional subtitle, and optional sound",
    inputSchema: {
      type: "object" as const,
      properties: {
        title: {
          type: "string",
          description: "The title of the notification",
        },
        message: {
          type: "string",
          description: "The main message content of the notification",
        },
        subtitle: {
          type: "string",
          description: "Optional subtitle text for the notification",
        },
        sound: {
          type: "string",
          enum: [
            "Basso",
            "Blow",
            "Bottle",
            "Frog",
            "Funk",
            "Glass",
            "Hero",
            "Morse",
            "Ping",
            "Pop",
            "Purr",
            "Sosumi",
            "Submarine",
            "Tink",
            "default",
          ],
          description: "Optional system sound to play with the notification",
        },
      },
      required: ["title", "message"],
    },
  },
  {
    name: "send_notification_with_actions",
    description:
      "Display an interactive macOS dialog with action buttons that waits for user response. Use this when you need user confirmation or choice between multiple options.",
    inputSchema: {
      type: "object" as const,
      properties: {
        title: {
          type: "string",
          description: "The title of the dialog",
        },
        message: {
          type: "string",
          description: "The message content of the dialog",
        },
        buttons: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            'Array of button labels (e.g., ["Cancel", "Accept"]). Default is ["Cancel", "OK"]',
          default: ["Cancel", "OK"],
        },
        defaultButton: {
          type: "string",
          description:
            "The label of the button that should be highlighted as default",
        },
        cancelButton: {
          type: "string",
          description:
            "The label of the button that acts as cancel (ESC key)",
        },
        givingUpAfter: {
          type: "number",
          description:
            "Number of seconds before the dialog auto-dismisses (optional)",
          minimum: 1,
        },
      },
      required: ["title", "message"],
    },
  },
  {
    name: "send_alert_with_actions",
    description:
      "Display an interactive macOS alert (more prominent than dialog) with action buttons that waits for user response. Use this for important confirmations or warnings.",
    inputSchema: {
      type: "object" as const,
      properties: {
        title: {
          type: "string",
          description: "The title/heading of the alert",
        },
        message: {
          type: "string",
          description: "The detailed message content of the alert",
        },
        buttons: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            'Array of button labels (e.g., ["Reject", "Accept"]). Default is ["Cancel", "OK"]',
          default: ["Cancel", "OK"],
        },
        defaultButton: {
          type: "string",
          description:
            "The label of the button that should be highlighted as default",
        },
        cancelButton: {
          type: "string",
          description:
            "The label of the button that acts as cancel (ESC key)",
        },
        givingUpAfter: {
          type: "number",
          description:
            "Number of seconds before the alert auto-dismisses (optional)",
          minimum: 1,
        },
      },
      required: ["title", "message"],
    },
  },
  {
    name: "send_notification_with_text_input",
    description:
      "Display an interactive macOS dialog that prompts the user for text input along with action buttons. Perfect for getting user feedback, names, or any text-based input.",
    inputSchema: {
      type: "object" as const,
      properties: {
        title: {
          type: "string",
          description: "The title of the dialog",
        },
        message: {
          type: "string",
          description: "The prompt message asking for user input",
        },
        defaultAnswer: {
          type: "string",
          description: "Default text to pre-fill in the input field",
          default: "",
        },
        hiddenAnswer: {
          type: "boolean",
          description:
            "If true, input will be hidden (password-style). Default is false",
          default: false,
        },
        buttons: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            'Array of button labels (e.g., ["Cancel", "Submit"]). Default is ["Cancel", "OK"]',
          default: ["Cancel", "OK"],
        },
        defaultButton: {
          type: "string",
          description:
            "The label of the button that should be highlighted as default",
        },
        cancelButton: {
          type: "string",
          description:
            "The label of the button that acts as cancel (ESC key)",
        },
        givingUpAfter: {
          type: "number",
          description:
            "Number of seconds before the dialog auto-dismisses (optional)",
          minimum: 1,
        },
      },
      required: ["title", "message"],
    },
  },
];
