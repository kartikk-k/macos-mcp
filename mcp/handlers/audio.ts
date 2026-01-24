import {
  getVolumeSettings,
  getVolume,
  setVolume,
  isMuted,
  mute,
  unmute,
  toggleMute,
  beep,
} from "../../src/audio";

export function handleAudioTool(
  name: string,
  args: Record<string, unknown>
): unknown {
  switch (name) {
    case "get_volume_settings":
      return getVolumeSettings();
    case "get_volume":
      return getVolume();
    case "set_volume":
      setVolume((args as { level: number }).level);
      return { success: true, level: (args as { level: number }).level };
    case "is_muted":
      return { muted: isMuted() };
    case "mute":
      mute();
      return { success: true, muted: true };
    case "unmute":
      unmute();
      return { success: true, muted: false };
    case "toggle_mute":
      return { muted: toggleMute() };
    case "beep":
      beep((args as { times?: number }).times);
      return { success: true };
    default:
      throw new Error(`Unknown audio tool: ${name}`);
  }
}
