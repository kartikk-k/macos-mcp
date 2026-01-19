import { runAppleScript } from "./runAppleScript";

export interface MailAccount {
  name: string;
  email: string;
}

export function getAccounts(): MailAccount[] {
  const script = `
tell application "Mail"
    set accountList to ""
    repeat with acc in accounts
        set accName to name of acc
        set accEmail to email addresses of acc
        set firstEmail to item 1 of accEmail
        set accountList to accountList & accName & "|||" & firstEmail & linefeed
    end repeat
    return accountList
end tell
`;

  const result = runAppleScript(script);
  if (!result) return [];

  return result
    .split("\n")
    .filter((line) => line.includes("|||"))
    .map((line) => {
      const [name, email] = line.split("|||");
      return { name: name.trim(), email: email.trim() };
    });
}
