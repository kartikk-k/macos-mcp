import { select, input, confirm } from "@inquirer/prompts";
import {
  getAccounts,
  getMails,
  composeMail,
  searchMails,
  checkMail,
  getUnreadCount,
  type SearchField,
} from "../src/mail";
import { safeGetUnreadCount } from "./utils";

export async function handleMailMenu() {
  while (true) {
    const totalUnread = safeGetUnreadCount();
    const unreadLabel = totalUnread > 0 ? ` (${totalUnread} unread)` : "";

    const choice = await select({
      message: "Mail Options:",
      choices: [
        { name: "View Mail Accounts", value: "accounts" },
        { name: "Read Emails from Account", value: "emails" },
        { name: "Compose Email", value: "compose" },
        { name: "Search Emails", value: "search" },
        { name: "Check for New Mail", value: "check" },
        { name: `Unread Count${unreadLabel}`, value: "unread" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "accounts") await handleViewAccounts();
    if (choice === "emails") await handleReadEmails();
    if (choice === "compose") await handleCompose();
    if (choice === "search") await handleSearch();
    if (choice === "check") await handleCheckMail();
    if (choice === "unread") await handleUnreadCount();
  }
}

async function handleViewAccounts() {
  console.log("\nFetching accounts...");
  const accounts = getAccounts();
  console.log("\n--- Mail Accounts ---");
  accounts.forEach((acc, i) => {
    console.log(`${i + 1}. ${acc.name} (${acc.email})`);
  });
  console.log("");
}

async function handleReadEmails() {
  console.log("\nFetching accounts...");
  const accounts = getAccounts();

  if (accounts.length === 0) {
    console.log("No mail accounts found.\n");
    return;
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

  if (selectedAccount === "__back__") return;

  console.log(`\nFetching emails from ${selectedAccount}...`);
  const mails = getMails(selectedAccount, 10);

  if (mails.length === 0) {
    console.log("No emails found in inbox.\n");
    return;
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

async function handleCompose() {
  const to = await input({
    message: "To (comma-separated for multiple):",
    validate: (val) => (val.length > 0 ? true : "At least one recipient required"),
  });

  const cc = await input({
    message: "CC (optional, comma-separated):",
  });

  const bcc = await input({
    message: "BCC (optional, comma-separated):",
  });

  const subject = await input({
    message: "Subject:",
  });

  const body = await input({
    message: "Body:",
  });

  const sendNow = await confirm({
    message: "Send immediately?",
    default: false,
  });

  const toAddresses = to.split(",").map((s) => s.trim()).filter(Boolean);
  const ccAddresses = cc ? cc.split(",").map((s) => s.trim()).filter(Boolean) : undefined;
  const bccAddresses = bcc ? bcc.split(",").map((s) => s.trim()).filter(Boolean) : undefined;

  console.log("\nPreparing email...");
  const success = composeMail({
    to: toAddresses,
    cc: ccAddresses,
    bcc: bccAddresses,
    subject,
    body,
    sendImmediately: sendNow,
  });

  if (success) {
    if (sendNow) {
      console.log("Email sent successfully!\n");
    } else {
      console.log("Email draft created. Check Mail app to review and send.\n");
    }
  } else {
    console.log("Failed to create email.\n");
  }
}

async function handleSearch() {
  console.log("\nFetching accounts...");
  const accounts = getAccounts();

  if (accounts.length === 0) {
    console.log("No mail accounts found.\n");
    return;
  }

  const selectedAccount = await select({
    message: "Select an account to search:",
    choices: [
      ...accounts.map((acc) => ({
        name: `${acc.name} (${acc.email})`,
        value: acc.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (selectedAccount === "__back__") return;

  const searchField = await select({
    message: "Search in:",
    choices: [
      { name: "Subject", value: "subject" },
      { name: "Sender", value: "sender" },
      { name: "Content (body)", value: "content" },
    ],
  });

  const query = await input({
    message: "Search query:",
    validate: (val) => (val.length > 0 ? true : "Query required"),
  });

  console.log(`\nSearching for "${query}" in ${searchField}...`);
  const results = searchMails(selectedAccount, query, searchField as SearchField, 20);

  if (results.length === 0) {
    console.log("No matching emails found.\n");
    return;
  }

  console.log(`\n--- Found ${results.length} Result(s) ---`);
  results.forEach((mail) => {
    console.log(`\n#${mail.index}`);
    console.log(`  Subject: ${mail.subject}`);
    console.log(`  From: ${mail.sender}`);
    console.log(`  Date: ${mail.dateReceived}`);
    console.log(`  Mailbox: ${mail.mailbox}`);
  });
  console.log("");
}

async function handleCheckMail() {
  const accounts = getAccounts();

  const choice = await select({
    message: "Check mail for:",
    choices: [
      { name: "All Accounts", value: "__all__" },
      ...accounts.map((acc) => ({
        name: `${acc.name} (${acc.email})`,
        value: acc.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (choice === "__back__") return;

  console.log("\nChecking for new mail...");
  const success = checkMail(choice === "__all__" ? undefined : choice);

  if (success) {
    console.log("Mail check initiated. New messages will appear shortly.\n");
  } else {
    console.log("Failed to check mail.\n");
  }
}

async function handleUnreadCount() {
  const accounts = getAccounts();

  const choice = await select({
    message: "View unread count for:",
    choices: [
      { name: "All Accounts", value: "__all__" },
      ...accounts.map((acc) => ({
        name: `${acc.name} (${acc.email})`,
        value: acc.name,
      })),
      { name: "< Back", value: "__back__" },
    ],
  });

  if (choice === "__back__") return;

  console.log("\nFetching unread counts...");
  const counts = getUnreadCount(choice === "__all__" ? undefined : choice);

  if (counts.length === 0) {
    console.log("No unread emails!\n");
    return;
  }

  console.log("\n--- Unread Emails ---");
  let total = 0;
  counts.forEach((item) => {
    console.log(`  ${item.account} / ${item.mailbox}: ${item.count}`);
    total += item.count;
  });
  console.log(`\n  Total: ${total} unread\n`);
}
