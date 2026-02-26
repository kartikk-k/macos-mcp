import { runAppleScript } from "./runAppleScript";

export interface NotificationOptions {
  title: string;
  message: string;
  subtitle?: string;
  sound?: string;
}

export function sendNotification(options: NotificationOptions): void {
  const { title, message, subtitle, sound } = options;

  let script = `display notification "${message}" with title "${title}"`;

  if (subtitle) {
    script += ` subtitle "${subtitle}"`;
  }

  if (sound) {
    script += ` sound name "${sound}"`;
  }

  runAppleScript(script);
}
