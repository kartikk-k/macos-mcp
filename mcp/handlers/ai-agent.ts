import { completed, inputRequired } from "../../src/ai-agent";

export function handleAiAgentTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "response_completed":
      completed();
      return { success: true, message: "Task completed notification played" };
    case "request_user_input":
      inputRequired();
      return { success: true, message: "Input required notification played" };
    default:
      throw new Error(`Unknown AI agent tool: ${name}`);
  }
}
