// Export window functions
export {
  getWindows,
  newWindow,
  closeWindow,
  focusWindow,
  type TerminalWindow,
} from "./windows";

// Export tab functions
export {
  getTabs,
  getActiveTab,
  newTab,
  closeTab,
  setActiveTab,
  type TerminalTab,
} from "./tabs";

// Export command functions
export { executeCommand, executeInActiveTab } from "./commands";

// Export session functions
export { getCurrentDirectory, getProcesses, isBusy } from "./session";

// Export property functions
export {
  getContents,
  getSelectedText,
  clear,
  getSettings,
  setProfile,
  type TerminalSettings,
} from "./properties";
