import { copyToClipboard, openInPrivate } from "./actions.js";

const menus = browser.menus || browser.contextMenus;
const { i18n, webRequest } = browser;


export const menuItems = {
    "extractUrl": {
        id: "extractUrl",
        contexts: ["link"],
        handler: copyToClipboard
    },
    "openInPrivate": {
        id: "openInPrivate",
        contexts: ["link"],
        handler: openInPrivate
    }
};

/**
 * is string
 *
 * @param {*} o - object to check
 * @returns {boolean} - result
 */
export const isString = o => typeof o === 'string' || o instanceof String;


export const handleAction = (info, tab) => {
    return new Promise((resolve, reject) => {
        try {
            const handler = getHandler(info.menuItemId);
            resolve(handler(info));
        } catch (error) {
            reject(error);
        }
    })
};

export const createContextMenu = () => {
    const items = Object.keys(menuItems);
    for (const item of items) {
        const { contexts, id: itemId } = menuItems[item];
        const itemTitle = i18n.getMessage(itemId);
        createMenuItem(itemId, itemTitle, contexts);
    }
};

export const createMenuItem = (id, title, contexts = []) => {
    if (isString(id) && isString(title) && Array.isArray(contexts)) {
        const opt = {
            id,
            contexts,
            title
        };
        menus.create(opt);
    }
};

export const getHandler = (id) => {
    if (null === menuItems[id]) {
        throw new Error(`No definition found for ${id}`);
    }
    if (typeof menuItems[id].handler !== "function") {
        console.warn(`No handler found for item ${id}`);
        return (() => {});
    }

    return menuItems[id].handler;
}