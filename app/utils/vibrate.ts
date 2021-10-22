import { Vibrate } from "nativescript-vibrate";
const vibrator = new Vibrate();

export default function vibrate(): void {
  vibrator.vibrate(30);
}
