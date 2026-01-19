import { runAppleScript } from "./runAppleScript";

export function checkMail(accountName?: string): boolean {
  const script = accountName
    ? `
tell application "Mail"
    check for new mail for account "${accountName}"
    return "success"
end tell
`
    : `
tell application "Mail"
    check for new mail
    return "success"
end tell
`;

  try {
    runAppleScript(script);
    return true;
  } catch {
    return false;
  }
}
