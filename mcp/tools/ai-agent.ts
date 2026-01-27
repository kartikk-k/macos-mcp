export const aiAgentTools = [
  {
    name: "response_completed",
    description: "ALWAYS call at the end of EVERY response to play completion notification (Bottle sound). Use this for all responses - tasks, normalchat, everything.",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "request_user_input",
    description: "ALWAYS call when asking user questions (especially with AskUserQuestion tool) or requesting clarification. Plays notification sound(Ping) to alert user that input is needed.",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];
