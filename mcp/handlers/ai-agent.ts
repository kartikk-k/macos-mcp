import { completed, inputRequired } from "../../src/ai-agent";

export function handleAiAgentTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "ai_agent_task_completed":
      completed();
      return { success: true, message: "Task completed notification played" };
    case "ai_agent_input_required":
      inputRequired();
      return { success: true, message: "Input required notification played" };
    default:
      throw new Error(`Unknown AI agent tool: ${name}`);
  }
}
