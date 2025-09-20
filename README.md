SGT-WATCH VS Code Extension
A VS Code extension that monitors main.dart with military-themed sergeant chatter and Believing Soldier encouragement. Port of the original Bash script: sgt-watch. Perfect for Dart beginners!
Features

Watches main.dart for changes in your VS Code workspace.
Military-style chatter for:
Empty files (sarcastic sergeant remarks).
Errors (debug tips for NoSuchMethodError, FormatException, etc.).
Interactive code (instructions for readLineSync).
Successful runs (celebratory messages).


Believing Soldier: Optional encouraging messages to keep you motivated.
Username authentication via VS Code input box.
In development: Idle chatter and customizable chatter files.

Prerequisites

Dart SDK: Installdart --version


VS Code: Installcode --version


Git: Installgit --version


Node.js and npm: Installnode --version
npm --version



Installation
Not yet published to the VS Code Marketplace. To test locally:

Clone the repo:git clone https://github.com/BiqqMax/sgt-watch-vscode.git
cd sgt-watch-vscode


Install dependencies:npm install


Compile the extension:npm run esbuild


Open in VS Code:code .


Press F5 to launch the Extension Development Host.
Open a workspace with main.dart (e.g., ~/Desktop/test-dart).

Usage

Save main.dart in your workspace (Ctrl+S).
Enter a username (e.g., admin, commander) when prompted.
See feedback in the VS Code Output panel:
Empty file: Sarcastic sergeant remarks.
Errors: Debug tips (e.g., "💡 Use try-catch with int.parse()").
Interactive code: Instructions to run dart main.dart manually.
Success: Celebratory messages with Believing Soldier encouragement.


In development: Idle chatter after 10 minutes.

Example
Create main.dart:
void main() {
  print('Hello, Dart programmers!');
}

Save main.dart in the Extension Development Host. Expected Output:
[Sgt_Vortex]: main.dart updated! Running...
[Sgt_Blaze]: Commander, what sorcery is this? main.dart just... worked?!
[Believing Soldier]: You've got this, Commander! main.dart's cheering for you!
Output: Hello, Dart programmers!

Configuration
In development: Customizable chatter files and settings (e.g., DART_FILE, BELIEVING_SOLDIER_ENABLED) will be configurable via VS Code settings.
Limitations

In development, not all Bash script features (e.g., idle chatter, customizable files) are implemented.
Monitors one file (main.dart).
Covers common Dart errors; may miss rare ones.
Requires Dart SDK and Node.js for local testing.

Contributing

Fork the repo.
Create a branch: git checkout -b my-feature.
Commit: git commit -m "Add feature".
Push: git push origin my-feature.
Open a pull request.

Report issues: GitHub Issues.
License
MIT License
Contact
Open an issue or ping me on Twitter/X with #SGTWatch.