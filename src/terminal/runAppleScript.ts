import { execSync } from "child_process";

export function runAppleScript(script: string): string {
  const escaped = script.replace(/'/g, "'\"'\"'");
  const result = execSync(`osascript -e '${escaped}'`, {
    encoding: "utf-8",
    timeout: 5000,
  });
  return result.trim();
}
