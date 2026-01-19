import { select } from "@inquirer/prompts";
import { getAccounts, getMails } from "./src/mail";

async function main() {
  console.log("Mail CLI - Navigate with arrow keys\n");

  while (true) {
    const mainChoice = await select({
      message: "What would you like to do?",
      choices: [
        { name: "View Mail Accounts", value: "accounts" },
        { name: "Read Emails from Account", value: "emails" },
        { name: "Exit", value: "exit" },
      ],
    });

    if (mainChoice === "exit") {
      console.log("Goodbye!");
      break;
    }

    if (mainChoice === "accounts") {
      console.log("\nFetching accounts...");
      const accounts = getAccounts();
      console.log("\n--- Mail Accounts ---");
      accounts.forEach((acc, i) => {
        console.log(`${i + 1}. ${acc.name} (${acc.email})`);
      });
      console.log("");
    }

    if (mainChoice === "emails") {
      console.log("\nFetching accounts...");
      const accounts = getAccounts();

      if (accounts.length === 0) {
        console.log("No mail accounts found.\n");
        continue;
      }

      const selectedAccount = await select({
        message: "Select an account to view emails:",
        choices: [
          ...accounts.map((acc) => ({
            name: `${acc.name} (${acc.email})`,
            value: acc.name,
          })),
          { name: "< Back", value: "__back__" },
        ],
      });

      if (selectedAccount === "__back__") continue;

      console.log(`\nFetching emails from ${selectedAccount}...`);
      const mails = getMails(selectedAccount, 10);

      if (mails.length === 0) {
        console.log("No emails found in inbox.\n");
        continue;
      }

      console.log("\n--- Newest 10 Emails ---");
      mails.forEach((mail) => {
        console.log(`\n#${mail.index}`);
        console.log(`  Subject: ${mail.subject}`);
        console.log(`  From: ${mail.sender}`);
        console.log(`  Date: ${mail.dateReceived}`);
      });
      console.log("");
    }
  }
}

main().catch(console.error);
