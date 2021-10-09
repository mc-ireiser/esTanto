import { NativeScriptConfig } from "@nativescript/core";

export default {
  id: "me.ireiser.alcambio",
  appPath: "app",
  appResourcesPath: "App_Resources",
  android: {
    v8Flags: "--expose_gc",
    markingMode: "none"
  }
} as NativeScriptConfig;
