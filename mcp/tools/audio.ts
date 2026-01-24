export const audioTools = [
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
];
