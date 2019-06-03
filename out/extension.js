"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const provider = new PhpXdebugConfigurationProvider();
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('php-xdebug', provider));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
const autoDebugConfig = {
    name: 'Launch currently open script',
    type: 'php',
    request: 'launch',
    program: '${file}',
    cwd: '${fileDirname}',
    port: 9000,
};
class PhpXdebugConfigurationProvider {
    resolveDebugConfiguration(folder, config, token) {
        // if launch.json is missing or empty
        if (!config.type && !config.request && !config.name) {
            return autoDebugConfig;
        }
        return config;
    }
}
