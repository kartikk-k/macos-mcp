import { beep } from "../../audio";

export function inputRequired(): void {
  beep(1, "Ping");
}
