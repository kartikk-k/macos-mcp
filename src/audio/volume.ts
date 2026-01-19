import { runAppleScript } from "./runAppleScript";

export interface VolumeSettings {
  outputVolume: number;
  inputVolume: number;
  alertVolume: number;
  outputMuted: boolean;
}

export function getVolumeSettings(): VolumeSettings {
  const script = `
set volSettings to get volume settings
set outputVol to output volume of volSettings
set inputVol to input volume of volSettings
set alertVol to alert volume of volSettings
set isMuted to output muted of volSettings
return (outputVol as string) & "|||" & (inputVol as string) & "|||" & (alertVol as string) & "|||" & (isMuted as string)
`;

  const result = runAppleScript(script);
  const [outputVolume, inputVolume, alertVolume, outputMuted] = result.split("|||");

  return {
    outputVolume: parseInt(outputVolume) || 0,
    inputVolume: parseInt(inputVolume) || 0,
    alertVolume: parseInt(alertVolume) || 0,
    outputMuted: outputMuted === "true",
  };
}

export function getVolume(): number {
  const script = `output volume of (get volume settings)`;
  const result = runAppleScript(script);
  return parseInt(result) || 0;
}

export function setVolume(level: number): void {
  const clamped = Math.max(0, Math.min(100, level));
  runAppleScript(`set volume output volume ${clamped}`);
}

export function isMuted(): boolean {
  const script = `output muted of (get volume settings)`;
  const result = runAppleScript(script);
  return result === "true";
}

export function mute(): void {
  runAppleScript(`set volume with output muted`);
}

export function unmute(): void {
  runAppleScript(`set volume without output muted`);
}

export function toggleMute(): boolean {
  if (isMuted()) {
    unmute();
    return false;
  } else {
    mute();
    return true;
  }
}
