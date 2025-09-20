"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var import_child_process = require("child_process");
var import_util = require("util");
var execPromise = (0, import_util.promisify)(import_child_process.exec);
async function activate(context) {
  console.log("SGT-WATCH is active!");
  const username = await vscode.window.showInputBox({
    prompt: "Who are you, Commander?",
    placeHolder: "Enter username (e.g., admin, commander)"
  });
  if (!username || !["admin", "commander", "general", "captain", "BiqqMax"].includes(username.toLowerCase())) {
    vscode.window.showErrorMessage("Access denied. \u{1F6AB}");
    return;
  }
  const sergeants = ["Sgt_Vortex", "Sgt_Blaze", "Sgt_Iron", "Sgt_Storm", "Sgt_Hawk"];
  const successChatter = [
    `${username}, what sorcery is this? main.dart just... worked?!`,
    `Hold on, ${username}, did main.dart actually do what it was supposed to?!`
  ];
  const errorChatter = [
    `${username}, what fresh hell is this? main.dart just imploded!`,
    `Did you declare war on main.dart, ${username}? It's fighting back!`
  ];
  const emptyChatter = [
    `${username}, what is this void? main.dart is a barren wasteland!`,
    `Did you ghost us, ${username}? main.dart is AWOL!`
  ];
  const believingSoldier = [
    `You've got this, ${username}! main.dart's cheering for you!`,
    `Keep at it, ${username}! Your code'll win this war yet!`
  ];
  const watcher = vscode.workspace.createFileSystemWatcher("**/main.dart");
  context.subscriptions.push(watcher);
  watcher.onDidChange(async (uri) => {
    if (!vscode.workspace.workspaceFolders) {
      vscode.window.showErrorMessage("No workspace open. Please open a folder containing main.dart.");
      return;
    }
    const fileContent = await vscode.workspace.fs.readFile(uri);
    const contentString = fileContent.toString();
    const isEmpty = !contentString.trim() || contentString.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").trim() === "";
    if (isEmpty) {
      vscode.window.showWarningMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: ${emptyChatter[Math.floor(Math.random() * emptyChatter.length)]}`);
      vscode.window.showInformationMessage(`\u{1F4A1} QUICK START: Write print('Hello World!'); in main.dart`);
      return;
    }
    vscode.window.showInformationMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: main.dart updated! Running...`);
    try {
      const { stdout, stderr } = await execPromise("dart run main.dart", {
        cwd: vscode.workspace.workspaceFolders[0].uri.fsPath,
        timeout: 2e3
      });
      if (stderr) {
        const errorType = stderr.match(/(NoSuchMethodError|FormatException|TypeError|CastError|ArgumentError|RangeError|StateError)/)?.[0] || "Unknown";
        vscode.window.showErrorMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: ${errorChatter[Math.floor(Math.random() * errorChatter.length)]}`);
        vscode.window.showInformationMessage(`\u{1F4A1} Fix ${errorType}: ${getErrorTip(errorType)}`);
      } else if (contentString.includes("readLineSync") || stdout.match(/(Enter|Input|Name|Password|Press|Type|stdout\.write)/)) {
        vscode.window.showWarningMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: main.dart needs input! Run 'dart main.dart' manually.`);
      } else {
        vscode.window.showInformationMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: ${successChatter[Math.floor(Math.random() * successChatter.length)]}`);
        if (Math.random() < 0.5) {
          vscode.window.showInformationMessage(`[Believing Soldier]: ${believingSoldier[Math.floor(Math.random() * believingSoldier.length)]}`);
        }
        vscode.window.showInformationMessage(`Output:
${stdout}`);
      }
    } catch (error) {
      vscode.window.showErrorMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: Crash detected! ${error.message}`);
    }
  });
}
function getErrorTip(errorType) {
  switch (errorType) {
    case "NoSuchMethodError":
      return "Check method names - Dart is case-sensitive!";
    case "FormatException":
      return "Input parsing issue - use try-catch with int.parse()";
    case "TypeError":
    case "CastError":
      return 'Type mismatch - use "as" keyword or "is" checking';
    case "ArgumentError":
      return "Wrong number of arguments - check function calls";
    case "RangeError":
      return "Index out of bounds - check list.length first";
    case "StateError":
      return "Invalid stream operation - check stream state";
    default:
      return "Check error above - add print() statements to debug";
  }
}
function deactivate() {
  console.log("SGT-WATCH is deactivated.");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
