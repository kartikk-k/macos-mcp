import { runAppleScript } from "./runAppleScript";

export interface NotificationActionOptions {
  title: string;
  message: string;
  buttons?: string[];
  defaultButton?: string;
  cancelButton?: string;
  givingUpAfter?: number; // seconds before auto-dismiss
}

export interface NotificationActionResponse {
  buttonReturned: string;
  gaveUp: boolean;
}

export function sendNotificationWithActions(
  options: NotificationActionOptions
): NotificationActionResponse {
  const {
    title,
    message,
    buttons = ["Cancel", "OK"],
    defaultButton,
    cancelButton,
    givingUpAfter,
  } = options;

  // Build the buttons array for AppleScript
  const buttonList = buttons.map((b) => `"${b}"`).join(", ");

  let script = `display dialog "${message}" with title "${title}" buttons {${buttonList}}`;

  if (defaultButton) {
    script += ` default button "${defaultButton}"`;
  }

  if (cancelButton) {
    script += ` cancel button "${cancelButton}"`;
  }

  if (givingUpAfter) {
    script += ` giving up after ${givingUpAfter}`;
  }

  try {
    const result = runAppleScript(script);

    // Parse the result
    // Format: "button returned:OK" or "button returned:Accept, gave up:false"
    const buttonMatch = result.match(/button returned:([^,]+)/);
    const gaveUpMatch = result.match(/gave up:(true|false)/);

    return {
      buttonReturned: buttonMatch ? buttonMatch[1].trim() : "Unknown",
      gaveUp: gaveUpMatch ? gaveUpMatch[1] === "true" : false,
    };
  } catch (error) {
    // User cancelled or error occurred
    return {
      buttonReturned: cancelButton || "Cancel",
      gaveUp: false,
    };
  }
}

export function sendAlertWithActions(
  options: NotificationActionOptions
): NotificationActionResponse {
  const {
    title,
    message,
    buttons = ["Cancel", "OK"],
    defaultButton,
    cancelButton,
    givingUpAfter,
  } = options;

  // Build the buttons array for AppleScript
  const buttonList = buttons.map((b) => `"${b}"`).join(", ");

  let script = `display alert "${title}" message "${message}" buttons {${buttonList}}`;

  if (defaultButton) {
    script += ` default button "${defaultButton}"`;
  }

  if (cancelButton) {
    script += ` cancel button "${cancelButton}"`;
  }

  if (givingUpAfter) {
    script += ` giving up after ${givingUpAfter}`;
  }

  try {
    const result = runAppleScript(script);

    // Parse the result
    const buttonMatch = result.match(/button returned:([^,]+)/);
    const gaveUpMatch = result.match(/gave up:(true|false)/);

    return {
      buttonReturned: buttonMatch ? buttonMatch[1].trim() : "Unknown",
      gaveUp: gaveUpMatch ? gaveUpMatch[1] === "true" : false,
    };
  } catch (error) {
    // User cancelled or error occurred
    return {
      buttonReturned: cancelButton || "Cancel",
      gaveUp: false,
    };
  }
}
