import { ApplicationSettings, Dialogs } from "@nativescript/core";
import disclaimerDialog from "~/data/disclaimerDialog";

export default function showDisclaimer(): void {
  const { title, message, okButtonText } = disclaimerDialog;
  Dialogs.alert({ title, message, okButtonText }).then(() => {
    ApplicationSettings.setBoolean("tos", true);
  });
}
