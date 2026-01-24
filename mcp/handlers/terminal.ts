import {
  getWindows as getTerminalWindows,
  newWindow as newTerminalWindow,
  closeWindow as closeTerminalWindow,
  focusWindow as focusTerminalWindow,
  getTabs,
  getActiveTab as getActiveTerminalTab,
  newTab,
  closeTab as closeTerminalTab,
  setActiveTab as setActiveTerminalTab,
  executeCommand,
  executeInActiveTab,
  getCurrentDirectory,
  getProcesses,
  isBusy,
  getContents,
  getSelectedText,
  clear,
  getSettings,
  setProfile,
} from "../../src/terminal";

export function handleTerminalTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "terminal_new_window":
      return {
        success: newTerminalWindow(
          (args as { command?: string; workingDirectory?: string }).command,
          (args as { command?: string; workingDirectory?: string })
            .workingDirectory
        ),
      };
    case "terminal_get_windows":
      return getTerminalWindows();
    case "terminal_close_window":
      return {
        success: closeTerminalWindow(
          (args as { windowIndex?: number }).windowIndex ?? 1
        ),
      };
    case "terminal_focus_window":
      return {
        success: focusTerminalWindow(
          (args as { windowIndex?: number }).windowIndex ?? 1
        ),
      };
    case "terminal_new_tab":
      return {
        success: newTab(
          (args as {
            windowIndex?: number;
            command?: string;
            workingDirectory?: string;
          }).windowIndex,
          (args as {
            windowIndex?: number;
            command?: string;
            workingDirectory?: string;
          }).command,
          (args as {
            windowIndex?: number;
            command?: string;
            workingDirectory?: string;
          }).workingDirectory
        ),
      };
    case "terminal_get_tabs":
      return getTabs((args as { windowIndex?: number }).windowIndex ?? 1);
    case "terminal_get_active_tab":
      return getActiveTerminalTab();
    case "terminal_close_tab":
      return {
        success: closeTerminalTab(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "terminal_set_active_tab":
      return {
        success: setActiveTerminalTab(
          (args as { windowIndex: number; tabIndex: number }).windowIndex,
          (args as { windowIndex: number; tabIndex: number }).tabIndex
        ),
      };
    case "terminal_execute_command": {
      const terminalExecArgs = args as {
        command: string;
        windowIndex?: number;
        tabIndex?: number;
        waitForCompletion?: boolean;
      };
      return {
        success: executeCommand(
          terminalExecArgs.command,
          terminalExecArgs.windowIndex ?? 1,
          terminalExecArgs.tabIndex ?? 1,
          terminalExecArgs.waitForCompletion ?? false
        ),
      };
    }
    case "terminal_execute_in_active_tab":
      return {
        success: executeInActiveTab((args as { command: string }).command),
      };
    case "terminal_get_current_directory":
      return {
        directory: getCurrentDirectory(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "terminal_get_processes":
      return {
        processes: getProcesses(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "terminal_is_busy":
      return isBusy(
        (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
        (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
      );
    case "terminal_get_contents":
      return {
        contents: getContents(
          (args as { windowIndex?: number; tabIndex?: number; lineLimit?: number })
            .windowIndex ?? 1,
          (args as { windowIndex?: number; tabIndex?: number; lineLimit?: number })
            .tabIndex ?? 1,
          (args as { windowIndex?: number; tabIndex?: number; lineLimit?: number })
            .lineLimit
        ),
      };
    case "terminal_get_selected_text":
      return { text: getSelectedText() };
    case "terminal_clear":
      return {
        success: clear(
          (args as { windowIndex?: number; tabIndex?: number }).windowIndex ??
            1,
          (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
        ),
      };
    case "terminal_get_settings":
      return getSettings(
        (args as { windowIndex?: number; tabIndex?: number }).windowIndex ?? 1,
        (args as { windowIndex?: number; tabIndex?: number }).tabIndex ?? 1
      );
    case "terminal_set_profile":
      return {
        success: setProfile(
          (args as {
            profileName: string;
            windowIndex?: number;
            tabIndex?: number;
          }).profileName,
          (args as {
            profileName: string;
            windowIndex?: number;
            tabIndex?: number;
          }).windowIndex ?? 1,
          (args as {
            profileName: string;
            windowIndex?: number;
            tabIndex?: number;
          }).tabIndex ?? 1
        ),
      };
    default:
      throw new Error(`Unknown terminal tool: ${name}`);
  }
}
