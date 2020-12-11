# Facebook URL Cleaner

Sanitize URL from Facebook websites.

Coming soon:
- prevents standard events tracker from the Facebook page (ajax/bz XHR)

## Installation

The extension is currently in development and thus cannot be installed through the extension marketplace.

## Development

Use the `web-ext` command to run the addon in development mode. Check [here](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) for install information.

Create a `web-ext-config.js` file at the root of the project and export desired configuration. For example, the following configuration will open the extension in Firefox Developer Edition, with:
- a Facebook page to test features
- the debugging page to inspect the extension (better than `browserConsole` option which displays a lot of useless messages)
- the addons page to quickly authorize incognito mode for the temporary addon

```js
module.exports = {
    run: {
        firefox: "firefoxdeveloperedition",
        startUrl: ["https://fr-fr.facebook.com/LeGrandMix/", "about:debugging#/runtime/this-firefox", "about:addons"]
    }
};
```

Then run web-ext from a terminal: 
```shell
$ web-ext run
```

### VSCode

Configure run task by adding the following file to your local `.vscode` directory at the root of the project: 
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Web-Ext",
            "type": "shell",
            "command": "web-ext run"
        }
    ]
}
```
