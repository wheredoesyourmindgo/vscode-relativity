# Relativity

Relativity is a Visual Studio Code extension that allows you to quickly jump and (optionally) select lines in your code editor relative to your current line number.

## Features

- **Jump Up**: Quickly jump up a specified number of lines.
- **Jump Down**: Quickly jump down a specified number of lines.
- **Select Up**: Select lines as you jump up.
- **Select Down**: Select lines as you jump down.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for `Relativity`.
4. Click `Install` to install the extension.
5. Reload Visual Studio Code to activate the extension.

### Default Keybindings

- `ctrl+9`: Jump Up
- `ctrl+8`: Jump Down
- `ctrl+shift+9`: Select Up
- `ctrl+shift+8`: Select Down

You can also customize these keybindings in your VS Code `keybindings.json` file.

## Commands

- `relativity.jumpUp`: Jump up a specified number of lines.
- `relativity.jumpDown`: Jump down a specified number of lines.
- `relativity.selectUp`: Select lines as you jump up.
- `relativity.selectDown`: Select lines as you jump down.

## Settings

- **Select Entire Line**: A user-configurable setting that, when set to true, will select the entire starting and ending lines when using `selectUp` or `selectDown`. By default, this is set to false, and the extension will only select based on the cursor column.

To configure this setting, add the following to your `settings.json`:

```json
{
  "relativity.selectEntireLine": false
}
