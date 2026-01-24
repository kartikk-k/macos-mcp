import {
  getAccounts,
  getMails,
  composeMail,
  searchMails,
  checkMail,
  getUnreadCount,
  getTotalUnreadCount,
} from "../../src/mail";

export function handleMailTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "get_mail_accounts":
      return getAccounts();
    case "get_mails":
      return getMails(
        (args as { accountName: string; count?: number }).accountName,
        (args as { accountName: string; count?: number }).count
      );
    case "compose_mail": {
      const composeArgs = args as {
        to: string[];
        subject: string;
        body: string;
        cc?: string[];
        bcc?: string[];
        attachments?: string[];
        sendImmediately?: boolean;
      };
      return {
        success: composeMail({
          to: composeArgs.to,
          subject: composeArgs.subject,
          body: composeArgs.body,
          cc: composeArgs.cc,
          bcc: composeArgs.bcc,
          attachments: composeArgs.attachments,
          sendImmediately: composeArgs.sendImmediately,
        }),
      };
    }
    case "search_mails": {
      const searchArgs = args as {
        accountName: string;
        query: string;
        field?: "subject" | "sender" | "content";
        maxResults?: number;
      };
      return searchMails(
        searchArgs.accountName,
        searchArgs.query,
        searchArgs.field,
        searchArgs.maxResults
      );
    }
    case "check_mail":
      return {
        success: checkMail((args as { accountName?: string }).accountName),
      };
    case "get_unread_count":
      return getUnreadCount((args as { accountName?: string }).accountName);
    case "get_total_unread_count":
      return {
        total: getTotalUnreadCount(
          (args as { accountName?: string }).accountName
        ),
      };
    default:
      throw new Error(`Unknown mail tool: ${name}`);
  }
}
