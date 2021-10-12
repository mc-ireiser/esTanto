import { Vibrate } from "nativescript-vibrate";
const vibrator = new Vibrate();

export default function vibrate() {
  vibrator.vibrate(30);
}
