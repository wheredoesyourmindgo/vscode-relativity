import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const jump = (direction: 'up' | 'down') => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      vscode.window.showInputBox({ prompt: `Enter number of lines to jump ${direction}` }).then(value => {
        const lineNumber = parseInt(value || '0', 10);
        if (!isNaN(lineNumber)) {
          const newPosition = direction === 'up'
            ? editor.selection.active.line - lineNumber
            : editor.selection.active.line + lineNumber;

          const newSelection = new vscode.Selection(newPosition, 0, newPosition, 0);
          editor.selection = newSelection;
          editor.revealRange(newSelection);
        }
      });
    }
  };

  const jumpUp = vscode.commands.registerCommand('relativeJumper.jumpUp', () => jump('up'));
  const jumpDown = vscode.commands.registerCommand('relativeJumper.jumpDown', () => jump('down'));

  context.subscriptions.push(jumpUp);
  context.subscriptions.push(jumpDown);
}

export function deactivate() {}
