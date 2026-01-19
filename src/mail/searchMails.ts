import { runAppleScript } from "./runAppleScript";

export type SearchField = "subject" | "sender" | "content";

export interface SearchResult {
  index: number;
  subject: string;
  sender: string;
  dateReceived: string;
  mailbox: string;
}

export function searchMails(
  accountName: string,
  query: string,
  field: SearchField = "subject",
  maxResults: number = 20
): SearchResult[] {
  const script = `
tell application "Mail"
    set theAccount to account "${accountName}"
    set foundMessages to {}
    set outputText to ""
    set resultCount to 0

    repeat with theMailbox in mailboxes of theAccount
        try
            set matchingMessages to (every message of theMailbox whose ${field} contains "${query.replace(/"/g, '\\"')}")
            repeat with theMessage in matchingMessages
                if resultCount < ${maxResults} then
                    set resultCount to resultCount + 1
                    set theSubject to subject of theMessage
                    set theSender to sender of theMessage
                    set theDate to date received of theMessage as string
                    set theMailboxName to name of theMailbox
                    set outputText to outputText & resultCount & "|||" & theSubject & "|||" & theSender & "|||" & theDate & "|||" & theMailboxName & linefeed
                end if
            end repeat
        end try
        if resultCount >= ${maxResults} then exit repeat
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
        const [index, subject, sender, dateReceived, mailbox] = line.split("|||");
        return {
          index: parseInt(index.trim()),
          subject: subject.trim(),
          sender: sender.trim(),
          dateReceived: dateReceived.trim(),
          mailbox: mailbox.trim(),
        };
      });
  } catch {
    return [];
  }
}
