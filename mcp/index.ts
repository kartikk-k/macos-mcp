// Import tool definitions
import { audioTools } from "./tools/audio";
import { mailTools } from "./tools/mail";
import { finderTools } from "./tools/finder";
import { chromeTools } from "./tools/chrome";
import { safariTools } from "./tools/safari";
import { calendarTools } from "./tools/calendar";
import { remindersTools } from "./tools/reminders";
import { notesTools } from "./tools/notes";
import { contactsTools } from "./tools/contacts";
import { terminalTools } from "./tools/terminal";
import { aiAgentTools } from "./tools/ai-agent";
import { notificationTools } from "./tools/notification";

// Import handlers
import { handleAudioTool } from "./handlers/audio";
import { handleMailTool } from "./handlers/mail";
import { handleFinderTool } from "./handlers/finder";
import { handleChromeTool } from "./handlers/chrome";
import { handleSafariTool } from "./handlers/safari";
import { handleCalendarTool } from "./handlers/calendar";
import { handleRemindersTool } from "./handlers/reminders";
import { handleNotesTool } from "./handlers/notes";
import { handleContactsTool } from "./handlers/contacts";
import { handleTerminalTool } from "./handlers/terminal";
import { handleAiAgentTool } from "./handlers/ai-agent";
import { handleNotificationTool } from "./handlers/notification";

// Combine all tool definitions
export const tools = [
  ...audioTools,
  ...mailTools,
  ...finderTools,
  ...chromeTools,
  ...safariTools,
  ...calendarTools,
  ...remindersTools,
  ...notesTools,
  ...contactsTools,
  ...terminalTools,
  ...aiAgentTools,
  ...notificationTools,
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

    // Route to appropriate handler based on tool name prefix
    if (name.startsWith("get_volume") || name.startsWith("set_volume") ||
        name === "is_muted" || name === "mute" || name === "unmute" ||
        name === "toggle_mute" || name === "beep") {
      result = handleAudioTool(name, args);
    } else if (name.startsWith("get_mail") || name.startsWith("compose_mail") ||
               name.startsWith("search_mail") || name.startsWith("check_mail") ||
               name.startsWith("get_unread") || name.startsWith("get_total")) {
      result = handleMailTool(name, args);
    } else if (name.startsWith("finder_")) {
      result = handleFinderTool(name, args);
    } else if (name.startsWith("chrome_")) {
      result = handleChromeTool(name, args);
    } else if (name.startsWith("safari_")) {
      result = handleSafariTool(name, args);
    } else if (name.startsWith("calendar_")) {
      result = handleCalendarTool(name, args);
    } else if (name.startsWith("reminders_")) {
      result = handleRemindersTool(name, args);
    } else if (name.startsWith("notes_")) {
      result = handleNotesTool(name, args);
    } else if (name.startsWith("contacts_")) {
      result = handleContactsTool(name, args);
    } else if (name.startsWith("terminal_")) {
      result = handleTerminalTool(name, args);
    } else if (name.startsWith("response_completed") || name.startsWith("request_user_input")) {
      result = handleAiAgentTool(name, args);
    } else if (name.startsWith("send_notification")) {
      result = handleNotificationTool(name, args);
    } else {
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
