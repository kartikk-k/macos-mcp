import { runAppleScript } from "./runAppleScript";

export interface Mail {
  index: number;
  subject: string;
  sender: string;
  dateReceived: string;
}

export function getMails(accountName: string, count: number = 10): Mail[] {
  const script = `
tell application "Mail"
    set theAccount to account "${accountName}"
    set theMailbox to mailbox "INBOX" of theAccount
    set theMessages to every message of theMailbox

    set maxCount to ${count}
    if (count of theMessages) < maxCount then set maxCount to (count of theMessages)

    set outputText to ""
    repeat with i from 1 to maxCount
        set theMessage to item i of theMessages
        set theSubject to subject of theMessage
        set theSender to sender of theMessage
        set theDate to date received of theMessage as string

        set outputText to outputText & i & "|||" & theSubject & "|||" & theSender & "|||" & theDate & linefeed
    end repeat

    return outputText
end tell
`;

  const result = runAppleScript(script);
  if (!result) return [];

  return result
    .split("\n")
    .filter((line) => line.includes("|||"))
    .map((line) => {
      const [index, subject, sender, dateReceived] = line.split("|||");
      return {
        index: parseInt(index.trim()),
        subject: subject.trim(),
        sender: sender.trim(),
        dateReceived: dateReceived.trim(),
      };
    });
}
