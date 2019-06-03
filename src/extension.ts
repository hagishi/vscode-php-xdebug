// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const provider = new PhpXdebugConfigurationProvider();
  context.subscriptions.push(
    vscode.debug.registerDebugConfigurationProvider('php-xdebug', provider)
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

const autoDebugConfig = {
  name: 'Launch currently open script',
  type: 'php',
  request: 'launch',
  program: '${file}',
  cwd: '${fileDirname}',
  port: 9000,
};

class PhpXdebugConfigurationProvider
  implements vscode.DebugConfigurationProvider {
  resolveDebugConfiguration(
    folder: vscode.WorkspaceFolder | undefined,
    config: vscode.DebugConfiguration,
    token?: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.DebugConfiguration> {
    // if launch.json is missing or empty
    if (!config.type && !config.request && !config.name) {
      return autoDebugConfig;
    }
    return config;
  }
}
