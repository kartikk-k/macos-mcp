import { input, select, number, confirm } from "@inquirer/prompts";
import {
  sendNotification,
  sendNotificationWithActions,
  sendAlertWithActions,
  sendNotificationWithTextInput,
} from "../src/notification";

export async function handleNotificationMenu() {
  while (true) {
    const choice = await select({
      message: "Notification Controls:",
      choices: [
        { name: "Send Notification", value: "send" },
        { name: "Send Notification with Sound", value: "send_with_sound" },
        { name: "Send Complete Notification", value: "send_complete" },
        { name: "Send Dialog with Actions (Accept/Reject)", value: "send_dialog" },
        { name: "Send Alert with Actions", value: "send_alert" },
        { name: "Send Custom Dialog", value: "send_custom_dialog" },
        { name: "Request Text Input from User", value: "send_text_input" },
        { name: "Request Password/Hidden Input", value: "send_password_input" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "send") {
      const title = await input({
        message: "Notification title:",
        required: true,
      });

      const message = await input({
        message: "Notification message:",
        required: true,
      });

      sendNotification({ title, message });
      console.log("\n✓ Notification sent!\n");
    }

    if (choice === "send_with_sound") {
      const title = await input({
        message: "Notification title:",
        required: true,
      });

      const message = await input({
        message: "Notification message:",
        required: true,
      });

      const sound = await select({
        message: "Select a sound:",
        choices: [
          { name: "Glass", value: "Glass" },
          { name: "Ping", value: "Ping" },
          { name: "Pop", value: "Pop" },
          { name: "Basso", value: "Basso" },
          { name: "Blow", value: "Blow" },
          { name: "Bottle", value: "Bottle" },
          { name: "Frog", value: "Frog" },
          { name: "Funk", value: "Funk" },
          { name: "Hero", value: "Hero" },
          { name: "Morse", value: "Morse" },
          { name: "Purr", value: "Purr" },
          { name: "Sosumi", value: "Sosumi" },
          { name: "Submarine", value: "Submarine" },
          { name: "Tink", value: "Tink" },
          { name: "Default", value: "default" },
        ],
      });

      sendNotification({ title, message, sound });
      console.log("\n✓ Notification with sound sent!\n");
    }

    if (choice === "send_complete") {
      const title = await input({
        message: "Notification title:",
        required: true,
      });

      const message = await input({
        message: "Notification message:",
        required: true,
      });

      const subtitle = await input({
        message: "Notification subtitle (optional):",
      });

      const sound = await select({
        message: "Select a sound:",
        choices: [
          { name: "None", value: "" },
          { name: "Glass", value: "Glass" },
          { name: "Ping", value: "Ping" },
          { name: "Pop", value: "Pop" },
          { name: "Basso", value: "Basso" },
          { name: "Blow", value: "Blow" },
          { name: "Bottle", value: "Bottle" },
          { name: "Frog", value: "Frog" },
          { name: "Funk", value: "Funk" },
          { name: "Hero", value: "Hero" },
          { name: "Morse", value: "Morse" },
          { name: "Purr", value: "Purr" },
          { name: "Sosumi", value: "Sosumi" },
          { name: "Submarine", value: "Submarine" },
          { name: "Tink", value: "Tink" },
          { name: "Default", value: "default" },
        ],
      });

      const options: any = { title, message };
      if (subtitle) options.subtitle = subtitle;
      if (sound) options.sound = sound;

      sendNotification(options);
      console.log("\n✓ Complete notification sent!\n");
    }

    if (choice === "send_dialog") {
      const title = await input({
        message: "Dialog title:",
        required: true,
      });

      const message = await input({
        message: "Dialog message:",
        required: true,
      });

      const result = sendNotificationWithActions({
        title,
        message,
        buttons: ["Reject", "Accept"],
        defaultButton: "Accept",
        cancelButton: "Reject",
      });

      console.log(
        `\n✓ User clicked: ${result.buttonReturned}${result.gaveUp ? " (auto-dismissed)" : ""}\n`
      );
    }

    if (choice === "send_alert") {
      const title = await input({
        message: "Alert title:",
        required: true,
      });

      const message = await input({
        message: "Alert message:",
        required: true,
      });

      const result = sendAlertWithActions({
        title,
        message,
        buttons: ["Cancel", "Continue"],
        defaultButton: "Continue",
        cancelButton: "Cancel",
      });

      console.log(
        `\n✓ User clicked: ${result.buttonReturned}${result.gaveUp ? " (auto-dismissed)" : ""}\n`
      );
    }

    if (choice === "send_custom_dialog") {
      const title = await input({
        message: "Dialog title:",
        required: true,
      });

      const message = await input({
        message: "Dialog message:",
        required: true,
      });

      const button1 = await input({
        message: "Button 1 label:",
        default: "Cancel",
      });

      const button2 = await input({
        message: "Button 2 label:",
        default: "OK",
      });

      const button3 = await input({
        message: "Button 3 label (optional):",
      });

      const buttons = button3
        ? [button1, button2, button3]
        : [button1, button2];

      const useTimeout = await select({
        message: "Auto-dismiss after timeout?",
        choices: [
          { name: "No", value: "no" },
          { name: "Yes", value: "yes" },
        ],
      });

      let timeout: number | undefined;
      if (useTimeout === "yes") {
        timeout = await number({
          message: "Timeout in seconds:",
          default: 10,
          min: 1,
        });
      }

      const dialogType = await select({
        message: "Dialog type:",
        choices: [
          { name: "Dialog", value: "dialog" },
          { name: "Alert (more prominent)", value: "alert" },
        ],
      });

      const result =
        dialogType === "dialog"
          ? sendNotificationWithActions({
              title,
              message,
              buttons,
              defaultButton: button2,
              cancelButton: button1,
              givingUpAfter: timeout,
            })
          : sendAlertWithActions({
              title,
              message,
              buttons,
              defaultButton: button2,
              cancelButton: button1,
              givingUpAfter: timeout,
            });

      console.log(
        `\n✓ User clicked: ${result.buttonReturned}${result.gaveUp ? " (auto-dismissed)" : ""}\n`
      );
    }

    if (choice === "send_text_input") {
      const title = await input({
        message: "Dialog title:",
        required: true,
      });

      const message = await input({
        message: "Prompt message:",
        required: true,
      });

      const defaultAnswer = await input({
        message: "Default answer (pre-filled text, optional):",
      });

      const result = sendNotificationWithTextInput({
        title,
        message,
        defaultAnswer: defaultAnswer || "",
        buttons: ["Cancel", "Submit"],
        defaultButton: "Submit",
        cancelButton: "Cancel",
      });

      if (result.cancelled) {
        console.log("\n✗ User cancelled the input\n");
      } else {
        console.log(
          `\n✓ User clicked: ${result.buttonReturned}\n✓ Text entered: "${result.textReturned}"\n`
        );
      }
    }

    if (choice === "send_password_input") {
      const title = await input({
        message: "Dialog title:",
        required: true,
      });

      const message = await input({
        message: "Prompt message:",
        required: true,
      });

      const result = sendNotificationWithTextInput({
        title,
        message,
        hiddenAnswer: true,
        buttons: ["Cancel", "Submit"],
        defaultButton: "Submit",
        cancelButton: "Cancel",
      });

      if (result.cancelled) {
        console.log("\n✗ User cancelled the input\n");
      } else {
        console.log(
          `\n✓ User clicked: ${result.buttonReturned}\n✓ Password entered (hidden): ${result.textReturned.length} characters\n`
        );
      }
    }
  }
}
