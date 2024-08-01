import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const jump = (direction: "up" | "down", select: boolean) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const config = vscode.workspace.getConfiguration("relativity");
      const selectEntireLine = config.get<boolean>("selectEntireLine", false);

      vscode.window
        .showInputBox({ prompt: `Enter number of lines to jump ${direction}` })
        .then((value) => {
          const lineNumber = parseInt(value || "0", 10);
          if (!isNaN(lineNumber)) {
            const currentPosition = editor.selection.active;
            const newPositionLine =
              direction === "up"
                ? Math.max(0, currentPosition.line - lineNumber)
                : Math.min(
                    editor.document.lineCount - 1,
                    currentPosition.line + lineNumber
                  );

            let newSelection: vscode.Selection;

            if (selectEntireLine && select) {
              const startLine = Math.min(currentPosition.line, newPositionLine);
              const endLine = Math.max(currentPosition.line, newPositionLine);
              newSelection = new vscode.Selection(
                new vscode.Position(startLine, 0),
                new vscode.Position(
                  endLine,
                  editor.document.lineAt(endLine).text.length
                )
              );
            } else {
              const newCharacter = Math.min(
                editor.document.lineAt(newPositionLine).text.length,
                currentPosition.character
              );
              const newPosition = new vscode.Position(
                newPositionLine,
                newCharacter
              );
              newSelection = select
                ? new vscode.Selection(currentPosition, newPosition)
                : new vscode.Selection(newPosition, newPosition);
            }

            editor.selection = newSelection;
            editor.revealRange(newSelection);
          }
        });
    }
  };

  const jumpUp = vscode.commands.registerCommand("relativity.jumpUp", () =>
    jump("up", false)
  );
  const jumpDown = vscode.commands.registerCommand("relativity.jumpDown", () =>
    jump("down", false)
  );
  const selectUp = vscode.commands.registerCommand("relativity.selectUp", () =>
    jump("up", true)
  );
  const selectDown = vscode.commands.registerCommand(
    "relativity.selectDown",
    () => jump("down", true)
  );

  context.subscriptions.push(jumpUp);
  context.subscriptions.push(jumpDown);
  context.subscriptions.push(selectUp);
  context.subscriptions.push(selectDown);
}

export function deactivate() {}
