import { getTotalUnreadCount } from "../src/mail";
import { getVolume, isMuted } from "../src/audio";

export function safeGetUnreadCount(): number {
  try {
    return getTotalUnreadCount();
  } catch {
    return 0;
  }
}

export function safeGetVolume(): number {
  try {
    return getVolume();
  } catch {
    return -1;
  }
}

export function safeIsMuted(): boolean | null {
  try {
    return isMuted();
  } catch {
    return null;
  }
}
