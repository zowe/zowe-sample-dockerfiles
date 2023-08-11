/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

const theiaVersion = process.argv[2] || "latest";
const packageJsonTemplate = `{
    "private": true,
    "theia": {
        "frontend": {
            "config": {
                "applicationName": "Theia Sample",
                "preferences": {
                    "files.enableTrash": false
                }
            }
        }
    },
    "dependencies": {
        "@theia/callhierarchy": "latest",
        "@theia/debug": "latest",
        "@theia/editor-preview": "latest",
        "@theia/file-search": "latest",
        "@theia/getting-started": "latest",
        "@theia/git": "latest",
        "@theia/markers": "latest",
        "@theia/messages": "latest",
        "@theia/mini-browser": "latest",
        "@theia/navigator": "latest",
        "@theia/outline-view": "latest",
        "@theia/plugin": "latest",
        "@theia/plugin-ext": "latest",
        "@theia/plugin-ext-vscode": "latest",
        "@theia/preferences": "latest",
        "@theia/preview": "latest",
        "@theia/search-in-workspace": "latest",
        "@theia/terminal": "latest",
        "@theia/vsx-registry": "latest"
    },
    "devDependencies": {
        "@theia/cli": "latest",
        "@theia/electron": "latest"
    },
    "scripts": {
        "preinstall": "node-gyp install"
    },
    "theiaPluginsDir": "plugins",
    "theiaPlugins": {
        "vscode-builtin-bat": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/bat-1.39.1-prel.vsix",
        "vscode-builtin-clojure": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/clojure-1.39.1-prel.vsix",
        "vscode-builtin-coffeescript": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/coffeescript-1.39.1-prel.vsix",
        "vscode-builtin-configuration-editing": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/configuration-editing-1.39.1-prel.vsix",
        "vscode-builtin-cpp": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/cpp-1.39.1-prel.vsix",
        "vscode-builtin-csharp": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/csharp-1.39.1-prel.vsix",
        "vscode-builtin-css": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/css-1.39.1-prel.vsix",
        "vscode-builtin-debug-auto-launch": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/debug-auto-launch-1.39.1-prel.vsix",
        "vscode-builtin-docker": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/docker-1.39.1-prel.vsix",
        "vscode-builtin-emmet": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/emmet-1.39.1-prel.vsix",
        "vscode-builtin-fsharp": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/fsharp-1.39.1-prel.vsix",
        "vscode-builtin-go": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/go-1.39.1-prel.vsix",
        "vscode-builtin-groovy": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/groovy-1.39.1-prel.vsix",
        "vscode-builtin-grunt": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/grunt-1.39.1-prel.vsix",
        "vscode-builtin-gulp": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/gulp-1.39.1-prel.vsix",
        "vscode-builtin-handlebars": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/handlebars-1.39.1-prel.vsix",
        "vscode-builtin-hlsl": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/hlsl-1.39.1-prel.vsix",
        "vscode-builtin-html": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/html-1.39.1-prel.vsix",
        "vscode-builtin-html-language-features": "https://open-vsx.org/api/vscode/html-language-features/1.49.0/file/vscode.html-language-features-1.49.0.vsix",
        "vscode-builtin-ini": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/ini-1.39.1-prel.vsix",
        "vscode-builtin-jake": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/jake-1.39.1-prel.vsix",
        "vscode-builtin-java": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/java-1.39.1-prel.vsix",
        "vscode-builtin-javascript": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/javascript-1.39.1-prel.vsix",
        "vscode-builtin-json": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/json-1.39.1-prel.vsix",
        "vscode-builtin-json-language-features": "https://open-vsx.org/api/vscode/json-language-features/1.46.1/file/vscode.json-language-features-1.46.1.vsix",
        "vscode-builtin-less": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/less-1.39.1-prel.vsix",
        "vscode-builtin-log": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/log-1.39.1-prel.vsix",
        "vscode-builtin-lua": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/lua-1.39.1-prel.vsix",
        "vscode-builtin-make": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/make-1.39.1-prel.vsix",
        "vscode-builtin-markdown": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/markdown-1.39.1-prel.vsix",
        "vscode-builtin-merge-conflicts": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/merge-conflict-1.39.1-prel.vsix",
        "vscode-builtin-npm": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/npm-1.39.1-prel.vsix",
        "vscode-builtin-node-debug": "https://github.com/theia-ide/vscode-node-debug/releases/download/v1.35.3/node-debug-1.35.3.vsix",
        "vscode-builtin-node-debug2": "https://github.com/theia-ide/vscode-node-debug2/releases/download/v1.33.0/node-debug2-1.33.0.vsix",
        "vscode-builtin-objective-c": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/objective-c-1.39.1-prel.vsix",
        "vscode-builtin-perl": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/perl-1.39.1-prel.vsix",
        "vscode-builtin-powershell": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/powershell-1.39.1-prel.vsix",
        "vscode-builtin-pug": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/pug-1.39.1-prel.vsix",
        "vscode-builtin-python": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/python-1.39.1-prel.vsix",
        "vscode-builtin-r": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/r-1.39.1-prel.vsix",
        "vscode-builtin-razor": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/razor-1.39.1-prel.vsix",
        "vscode-builtin-ruby": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/ruby-1.39.1-prel.vsix",
        "vscode-builtin-rust": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/rust-1.39.1-prel.vsix",
        "vscode-builtin-scss": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/scss-1.39.1-prel.vsix",
        "vscode-builtin-shaderlab": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/shaderlab-1.39.1-prel.vsix",
        "vscode-builtin-shellscript": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/shellscript-1.39.1-prel.vsix",
        "vscode-builtin-sql": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/sql-1.39.1-prel.vsix",
        "vscode-builtin-swift": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/swift-1.39.1-prel.vsix",
        "vscode-builtin-theme-abyss": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-abyss-1.39.1-prel.vsix",
        "vscode-builtin-theme-defaults": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-defaults-1.39.1-prel.vsix",
        "vscode-builtin-theme-kimbie-dark": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-kimbie-dark-1.39.1-prel.vsix",
        "vscode-builtin-theme-monokai": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-monokai-1.39.1-prel.vsix",
        "vscode-builtin-theme-dimmed": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-monokai-dimmed-1.39.1-prel.vsix",
        "vscode-builtin-theme-quietlight": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-quietlight-1.39.1-prel.vsix",
        "vscode-builtin-theme-red": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-red-1.39.1-prel.vsix",
        "vscode-builtin-theme-solarized-dark": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-solarized-dark-1.39.1-prel.vsix",
        "vscode-builtin-theme-tomorrow-night-blue": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/theme-tomorrow-night-blue-1.39.1-prel.vsix",
        "vscode-builtin-typescript": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/typescript-1.39.1-prel.vsix",
        "vscode-builtin-typescript-language-features": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/typescript-language-features-1.39.1-prel.vsix",
        "vscode-builtin-vb": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/vb-1.39.1-prel.vsix",
        "vscode-builtin-icon-theme-seti": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/vscode-theme-seti-1.39.1-prel.vsix",
        "vscode-builtin-xml": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/xml-1.39.1-prel.vsix",
        "vscode-builtin-yaml": "https://github.com/theia-ide/vscode-builtin-extensions/releases/download/v1.39.1-prel/yaml-1.39.1-prel.vsix",
        "vscode-editorconfig": "https://github.com/theia-ide/editorconfig-vscode/releases/download/v0.14.4/EditorConfig-0.14.4.vsix",
        "vscode-eslint": "https://github.com/theia-ide/vscode-eslint/releases/download/release%2F2.0.15/vscode-eslint-2.0.15.vsix"
    },
    "theiaPluginsExcludeIds": [
        "ms-vscode.js-debug-companion",
        "vscode.extension-editing",
        "vscode.git",
        "vscode.git-ui",
        "vscode.github",
        "vscode.github-authentication",
        "vscode.microsoft-authentication"
    ]
}`;

async function getTheiaPlugins(theiaVersion) {
    const theiaGitRef = theiaVersion !== "latest" ? `v${theiaVersion}` : "master";
    const response = await fetch(`https://raw.githubusercontent.com/eclipse-theia/theia/${theiaGitRef}/package.json`);
    const theiaPlugins = (await response.json()).theiaPlugins;
    const builtinExtensionPack = "eclipse-theia.builtin-extension-pack";
    return { [builtinExtensionPack]: theiaPlugins[builtinExtensionPack] };
}

(async () => {
    const packageJson = JSON.parse(packageJsonTemplate);
    for (const k of Object.keys(packageJson.dependencies)) {
        packageJson.dependencies[k] = theiaVersion;
    }
    for (const k of Object.keys(packageJson.devDependencies)) {
        packageJson.devDependencies[k] = theiaVersion;
    }
    packageJson.theiaPlugins = await getTheiaPlugins(theiaVersion);
    console.log(JSON.stringify(packageJson, null, 4));
})();
