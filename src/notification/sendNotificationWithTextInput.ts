import { runAppleScript } from "./runAppleScript";

export interface NotificationTextInputOptions {
  title: string;
  message: string;
  defaultAnswer?: string;
  hiddenAnswer?: boolean; // For password-style input
  buttons?: string[];
  defaultButton?: string;
  cancelButton?: string;
  givingUpAfter?: number;
}

export interface NotificationTextInputResponse {
  buttonReturned: string;
  textReturned: string;
  gaveUp: boolean;
  cancelled: boolean;
}

export function sendNotificationWithTextInput(
  options: NotificationTextInputOptions
): NotificationTextInputResponse {
  const {
    title,
    message,
    defaultAnswer = "",
    hiddenAnswer = false,
    buttons = ["Cancel", "OK"],
    defaultButton,
    cancelButton,
    givingUpAfter,
  } = options;

  // Build the buttons array for AppleScript
  const buttonList = buttons.map((b) => `"${b}"`).join(", ");

  let script = `display dialog "${message}" with title "${title}" default answer "${defaultAnswer}"`;

  if (hiddenAnswer) {
    script += ` hidden answer true`;
  }

  script += ` buttons {${buttonList}}`;

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
    // Format: "button returned:OK, text returned:user input text" or with "gave up:false"
    const buttonMatch = result.match(/button returned:([^,]+)/);
    const textMatch = result.match(/text returned:(.+?)(?:,|$)/);
    const gaveUpMatch = result.match(/gave up:(true|false)/);

    return {
      buttonReturned: buttonMatch ? buttonMatch[1].trim() : "Unknown",
      textReturned: textMatch ? textMatch[1].trim() : "",
      gaveUp: gaveUpMatch ? gaveUpMatch[1] === "true" : false,
      cancelled: false,
    };
  } catch (error) {
    // User cancelled or error occurred
    return {
      buttonReturned: cancelButton || "Cancel",
      textReturned: "",
      gaveUp: false,
      cancelled: true,
    };
  }
}

export function sendAlertWithTextInput(
  options: NotificationTextInputOptions
): NotificationTextInputResponse {
  // Note: display alert doesn't support text input, so we'll use display dialog
  // but with a note that this behaves like a dialog
  return sendNotificationWithTextInput(options);
}
