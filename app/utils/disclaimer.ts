import { ApplicationSettings, Dialogs } from "@nativescript/core";
import disclaimerDialog from "~/data/disclaimerDialog";

export default function showDisclaimer(): void {
  const { title, message } = disclaimerDialog;
  Dialogs.alert({ title, message, okButtonText: "Acepto" }).then(() => {
    ApplicationSettings.setBoolean("tos", true);
  });
}
