import { handleAction, createContextMenu } from "./main.js";

const menus = browser.menus || browser.contextMenus;

const throwErr = (err) => console.error(err);

menus.onClicked.addListener((info, tab) => {
    handleAction(info, tab).catch(throwErr);
});

/* startup */
document.addEventListener('DOMContentLoaded', () =>
    createContextMenu());