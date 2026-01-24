import { select, number } from "@inquirer/prompts";
import {
  getVolume,
  setVolume,
  isMuted,
  toggleMute,
  beep,
} from "../src/audio";

export async function handleAudioMenu() {
  while (true) {
    const currentVolume = getVolume();
    const mutedStatus = isMuted();
    const mutedLabel = mutedStatus ? " [MUTED]" : "";

    const choice = await select({
      message: `Audio Controls (Volume: ${currentVolume}%${mutedLabel}):`,
      choices: [
        { name: `Set Volume (current: ${currentVolume}%)`, value: "set_volume" },
        { name: "Volume Up (+10%)", value: "volume_up" },
        { name: "Volume Down (-10%)", value: "volume_down" },
        { name: mutedStatus ? "Unmute" : "Mute", value: "toggle_mute" },
        { name: "Play Beep", value: "beep" },
        { name: "< Back", value: "__back__" },
      ],
    });

    if (choice === "__back__") return;

    if (choice === "set_volume") {
      const newVolume = await number({
        message: "Enter volume level (0-100):",
        default: currentVolume,
        min: 0,
        max: 100,
      });
      if (newVolume !== undefined) {
        setVolume(newVolume);
        console.log(`\nVolume set to ${newVolume}%\n`);
      }
    }

    if (choice === "volume_up") {
      const newVolume = Math.min(100, currentVolume + 10);
      setVolume(newVolume);
      console.log(`\nVolume: ${newVolume}%\n`);
    }

    if (choice === "volume_down") {
      const newVolume = Math.max(0, currentVolume - 10);
      setVolume(newVolume);
      console.log(`\nVolume: ${newVolume}%\n`);
    }

    if (choice === "toggle_mute") {
      const nowMuted = toggleMute();
      console.log(nowMuted ? "\nMuted\n" : "\nUnmuted\n");
    }

    if (choice === "beep") {
      const times = await number({
        message: "How many beeps? (1-10):",
        default: 1,
        min: 1,
        max: 10,
      });
      beep(times || 1);
      console.log(`\nPlayed ${times || 1} beep(s)\n`);
    }
  }
}
