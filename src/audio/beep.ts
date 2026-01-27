import { runAppleScript } from "./runAppleScript";
import { execSync } from "child_process";

type SystemSound =
  | "Basso"
  | "Blow"
  | "Bottle"
  | "Frog"
  | "Funk"
  | "Glass"
  | "Hero"
  | "Morse"
  | "Ping"
  | "Pop"
  | "Purr"
  | "Sosumi"
  | "Submarine"
  | "Tink";

export function beep(times: number = 1, sound: SystemSound = "Pop"): void {
  const count = Math.max(1, Math.min(10, times));

  // If using system sounds, play the specified sound file
  const soundPath = `/System/Library/Sounds/${sound}.aiff`;

  for (let i = 0; i < count; i++) {
    try {
      execSync(`afplay "${soundPath}"`, { encoding: "utf-8", timeout: 5000 });
    } catch (error) {
      // Fallback to system beep if sound file not found
      runAppleScript(`beep 1`);
    }
  }
}
