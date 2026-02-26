import {
  sendNotification,
  sendNotificationWithActions,
  sendAlertWithActions,
  sendNotificationWithTextInput,
  type NotificationOptions,
  type NotificationActionOptions,
  type NotificationTextInputOptions,
} from "../../src/notification";

export function handleNotificationTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "send_notification":
      sendNotification(args as NotificationOptions);
      return { success: true, message: "Notification sent successfully" };
    case "send_notification_with_actions":
      const dialogResult = sendNotificationWithActions(
        args as NotificationActionOptions
      );
      return {
        success: true,
        buttonReturned: dialogResult.buttonReturned,
        gaveUp: dialogResult.gaveUp,
      };
    case "send_alert_with_actions":
      const alertResult = sendAlertWithActions(
        args as NotificationActionOptions
      );
      return {
        success: true,
        buttonReturned: alertResult.buttonReturned,
        gaveUp: alertResult.gaveUp,
      };
    case "send_notification_with_text_input":
      const textInputResult = sendNotificationWithTextInput(
        args as NotificationTextInputOptions
      );
      return {
        success: true,
        buttonReturned: textInputResult.buttonReturned,
        textReturned: textInputResult.textReturned,
        gaveUp: textInputResult.gaveUp,
        cancelled: textInputResult.cancelled,
      };
    default:
      throw new Error(`Unknown notification tool: ${name}`);
  }
}
