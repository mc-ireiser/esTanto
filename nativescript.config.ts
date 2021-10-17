import { NativeScriptConfig } from "@nativescript/core";

export default {
  id: "me.ireiser.estanto",
  appPath: "app",
  appResourcesPath: "App_Resources",
  android: {
    codeCache: true,
    v8Flags: "--expose_gc",
    markingMode: "none",
    discardUncaughtJsExceptions: true
  }
} as NativeScriptConfig;
