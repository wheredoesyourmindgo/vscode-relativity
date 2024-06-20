import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const jump = (direction: 'up' | 'down', select: boolean) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      vscode.window.showInputBox({ prompt: `Enter number of lines to jump ${direction}` }).then(value => {
        const lineNumber = parseInt(value || '0', 10);
        if (!isNaN(lineNumber)) {
          const currentPosition = editor.selection.active;
          const newPosition = direction === 'up'
            ? currentPosition.line - lineNumber
            : currentPosition.line + lineNumber;
          
          const newSelection = new vscode.Selection(
            currentPosition.line, currentPosition.character, 
            newPosition, currentPosition.character
          );

          if (select) {
            editor.selection = newSelection;
          } else {
            editor.selection = new vscode.Selection(newPosition, 0, newPosition, 0);
          }
          editor.revealRange(editor.selection);
        }
      });
    }
  };

  const jumpUp = vscode.commands.registerCommand('relativity.jumpUp', () => jump('up', false));
  const jumpDown = vscode.commands.registerCommand('relativity.jumpDown', () => jump('down', false));
  const selectUp = vscode.commands.registerCommand('relativity.selectUp', () => jump('up', true));
  const selectDown = vscode.commands.registerCommand('relativity.selectDown', () => jump('down', true));

  context.subscriptions.push(jumpUp);
  context.subscriptions.push(jumpDown);
  context.subscriptions.push(selectUp);
  context.subscriptions.push(selectDown);
}

export function deactivate() {}
