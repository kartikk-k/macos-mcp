import { select } from "@inquirer/prompts";
import { handleMailMenu } from "./mail";
import { handleAudioMenu } from "./audio";
import { handleFinderMenu } from "./finder";
import { handleChromeMenu } from "./chrome";

export async function main() {
  console.log("AppleScript CLI - Navigate with arrow keys\n");

  while (true) {
    const mainChoice = await select({
      message: "What would you like to do?",
      choices: [
        { name: "Mail", value: "mail" },
        { name: "Audio", value: "audio" },
        { name: "Finder", value: "finder" },
        { name: "Chrome", value: "chrome" },
        { name: "Exit", value: "exit" },
      ],
    });

    if (mainChoice === "exit") {
      console.log("Goodbye!");
      break;
    }

    if (mainChoice === "mail") {
      await handleMailMenu();
    }

    if (mainChoice === "audio") {
      await handleAudioMenu();
    }

    if (mainChoice === "finder") {
      await handleFinderMenu();
    }

    if (mainChoice === "chrome") {
      await handleChromeMenu();
    }
  }
}
