import { select } from "@inquirer/prompts";
import { handleMailMenu } from "./mail";
import { handleAudioMenu } from "./audio";
import { handleFinderMenu } from "./finder";
import { handleChromeMenu } from "./chrome";
import { handleCalendarMenu } from "./calendar";
import { handleContactsMenu } from "./contacts";
import { handleNotesMenu } from "./notes";
import { handleRemindersMenu } from "./reminders";
import { handleSafariMenu } from "./safari";
import { handleTerminalMenu } from "./terminal";

export async function main() {
  console.log("AppleScript CLI - Navigate with arrow keys\n");

  while (true) {
    const mainChoice = await select({
      message: "What would you like to do?",
      choices: [
        { name: "Audio", value: "audio" },
        { name: "Calendar", value: "calendar" },
        { name: "Chrome", value: "chrome" },
        { name: "Contacts", value: "contacts" },
        { name: "Finder", value: "finder" },
        { name: "Mail", value: "mail" },
        { name: "Notes", value: "notes" },
        { name: "Reminders", value: "reminders" },
        { name: "Safari", value: "safari" },
        { name: "Terminal", value: "terminal" },
        { name: "Exit", value: "exit" },
      ],
    });

    if (mainChoice === "exit") {
      console.log("Goodbye!");
      break;
    }

    if (mainChoice === "audio") {
      await handleAudioMenu();
    }

    if (mainChoice === "calendar") {
      await handleCalendarMenu();
    }

    if (mainChoice === "chrome") {
      await handleChromeMenu();
    }

    if (mainChoice === "contacts") {
      await handleContactsMenu();
    }

    if (mainChoice === "finder") {
      await handleFinderMenu();
    }

    if (mainChoice === "mail") {
      await handleMailMenu();
    }

    if (mainChoice === "notes") {
      await handleNotesMenu();
    }

    if (mainChoice === "reminders") {
      await handleRemindersMenu();
    }

    if (mainChoice === "safari") {
      await handleSafariMenu();
    }

    if (mainChoice === "terminal") {
      await handleTerminalMenu();
    }
  }
}
