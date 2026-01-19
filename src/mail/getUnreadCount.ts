import { runAppleScript } from "./runAppleScript";

export interface UnreadCount {
  account: string;
  mailbox: string;
  count: number;
}

export function getUnreadCount(accountName?: string): UnreadCount[] {
  const script = accountName
    ? `
tell application "Mail"
    set outputText to ""
    set theAccount to account "${accountName}"
    repeat with theMailbox in mailboxes of theAccount
        set unreadNum to unread count of theMailbox
        if unreadNum > 0 then
            set outputText to outputText & "${accountName}" & "|||" & (name of theMailbox) & "|||" & unreadNum & linefeed
        end if
    end repeat
    return outputText
end tell
`
    : `
tell application "Mail"
    set outputText to ""
    repeat with theAccount in accounts
        set accName to name of theAccount
        repeat with theMailbox in mailboxes of theAccount
            try
                set unreadNum to unread count of theMailbox
                if unreadNum > 0 then
                    set outputText to outputText & accName & "|||" & (name of theMailbox) & "|||" & unreadNum & linefeed
                end if
            end try
        end repeat
    end repeat
    return outputText
end tell
`;

  try {
    const result = runAppleScript(script);
    if (!result) return [];

    return result
      .split("\n")
      .filter((line) => line.includes("|||"))
      .map((line) => {
        const [account, mailbox, count] = line.split("|||");
        return {
          account: account.trim(),
          mailbox: mailbox.trim(),
          count: parseInt(count.trim()),
        };
      });
  } catch {
    return [];
  }
}

export function getTotalUnreadCount(accountName?: string): number {
  const counts = getUnreadCount(accountName);
  return counts.reduce((total, item) => total + item.count, 0);
}
