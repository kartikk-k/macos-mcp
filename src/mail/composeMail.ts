import { runAppleScript } from "./runAppleScript";

export interface ComposeOptions {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  attachments?: string[];
  sendImmediately?: boolean;
}

export function composeMail(options: ComposeOptions): boolean {
  const toRecipients = options.to
    .map((addr) => `make new to recipient at end of to recipients with properties {address:"${addr}"}`)
    .join("\n        ");

  const ccRecipients = options.cc?.length
    ? options.cc
        .map((addr) => `make new cc recipient at end of cc recipients with properties {address:"${addr}"}`)
        .join("\n        ")
    : "";

  const bccRecipients = options.bcc?.length
    ? options.bcc
        .map((addr) => `make new bcc recipient at end of bcc recipients with properties {address:"${addr}"}`)
        .join("\n        ")
    : "";

  const attachmentCommands = options.attachments?.length
    ? options.attachments
        .map((path) => `make new attachment with properties {file name:POSIX file "${path}"} at after the last paragraph of content`)
        .join("\n        ")
    : "";

  const sendCommand = options.sendImmediately ? "send theMessage" : "";

  const script = `
tell application "Mail"
    set theMessage to make new outgoing message with properties {subject:"${options.subject.replace(/"/g, '\\"')}", content:"${options.body.replace(/"/g, '\\"').replace(/\n/g, "\\n")}", visible:${!options.sendImmediately}}
    tell theMessage
        ${toRecipients}
        ${ccRecipients}
        ${bccRecipients}
        ${attachmentCommands}
    end tell
    ${sendCommand}
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
