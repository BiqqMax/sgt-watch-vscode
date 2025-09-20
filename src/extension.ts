import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function activate(context: vscode.ExtensionContext) {
    console.log('SGT-WATCH is active!');

    // Prompt for username
    const username = await vscode.window.showInputBox({
        prompt: 'Who are you, Commander?',
        placeHolder: 'Enter username (e.g., admin, commander)'
    });
    if (!username || !['admin', 'commander', 'general', 'captain', 'lieutenant'].includes(username.toLowerCase())) {
        vscode.window.showErrorMessage('Access denied. 🚫');
        return;
    }

    // Chatter arrays
    const sergeants = ['Sgt_Vortex', 'Sgt_Blaze', 'Sgt_Iron', 'Sgt_Storm', 'Sgt_Hawk'];
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

    // Watch main.dart
    const watcher = vscode.workspace.createFileSystemWatcher('**/main.dart');
    context.subscriptions.push(watcher);

    watcher.onDidChange(async (uri) => {
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('No workspace open. Please open a folder containing main.dart.');
            return;
        }

        const fileContent = await vscode.workspace.fs.readFile(uri);
        const contentString = fileContent.toString();

        // Check if file is empty or fully commented
        const isEmpty = !contentString.trim() || contentString.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim() === '';
        if (isEmpty) {
            vscode.window.showWarningMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: ${emptyChatter[Math.floor(Math.random() * emptyChatter.length)]}`);
            vscode.window.showInformationMessage(`💡 QUICK START: Write print('Hello World!'); in main.dart`);
            return;
        }

        // Run Dart file
        vscode.window.showInformationMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: main.dart updated! Running...`);
        try {
            const { stdout, stderr } = await execPromise('dart run main.dart', {
                cwd: vscode.workspace.workspaceFolders[0].uri.fsPath,
                timeout: 2000
            });
            if (stderr) {
                const errorType = stderr.match(/(NoSuchMethodError|FormatException|TypeError|CastError|ArgumentError|RangeError|StateError)/)?.[0] || 'Unknown';
                vscode.window.showErrorMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: ${errorChatter[Math.floor(Math.random() * errorChatter.length)]}`);
                vscode.window.showInformationMessage(`💡 Fix ${errorType}: ${getErrorTip(errorType)}`);
            } else if (contentString.includes('readLineSync') || stdout.match(/(Enter|Input|Name|Password|Press|Type|stdout\.write)/)) {
                vscode.window.showWarningMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: main.dart needs input! Run 'dart main.dart' manually.`);
            } else {
                vscode.window.showInformationMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: ${successChatter[Math.floor(Math.random() * successChatter.length)]}`);
                if (Math.random() < 0.5) {
                    vscode.window.showInformationMessage(`[Believing Soldier]: ${believingSoldier[Math.floor(Math.random() * believingSoldier.length)]}`);
                }
                vscode.window.showInformationMessage(`Output:\n${stdout}`);
            }
        } catch (error: any) { // Explicitly type as 'any' or cast to Error
            vscode.window.showErrorMessage(`[${sergeants[Math.floor(Math.random() * sergeants.length)]}]: Crash detected! ${(error as Error).message}`);
        }
    });
}

function getErrorTip(errorType: string): string {
    switch (errorType) {
        case 'NoSuchMethodError': return 'Check method names - Dart is case-sensitive!';
        case 'FormatException': return 'Input parsing issue - use try-catch with int.parse()';
        case 'TypeError': case 'CastError': return 'Type mismatch - use "as" keyword or "is" checking';
        case 'ArgumentError': return 'Wrong number of arguments - check function calls';
        case 'RangeError': return 'Index out of bounds - check list.length first';
        case 'StateError': return 'Invalid stream operation - check stream state';
        default: return 'Check error above - add print() statements to debug';
    }
}

export function deactivate() {
    console.log('SGT-WATCH is deactivated.');
}