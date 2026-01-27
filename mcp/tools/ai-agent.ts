export const aiAgentTools = [
  {
    name: "ai_agent_task_completed",
    description: "Play audio notification when AI agent task is completed (Bottle sound)",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "ai_agent_input_required",
    description: "Play audio notification when AI agent needs user input (Ping sound)",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];
