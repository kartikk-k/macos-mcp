import { runAppleScript } from "./runAppleScript";

export function beep(times: number = 1): void {
  const count = Math.max(1, Math.min(10, times));
  runAppleScript(`beep ${count}`);
}
