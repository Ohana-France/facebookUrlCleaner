const { clipboard } = navigator;
const { i18n, notifications, windows } = browser;

export const copyToClipboard = (info) => {
    const { linkUrl: url } = info;
    const sanitizedUrl = sanitizeUrl(url);

    return clipboard.writeText(sanitizedUrl)
        .then(() => {
            const title = i18n.getMessage("copyNotificationTitle");
            const content = i18n.getMessage("copyNotificationContent", sanitizedUrl);
            notifications.create({
                "type": "basic",
                "title": title,
                "message": content
            }).then((id) => {
                const handleClick = (id) => {
                    notifications.onClicked.removeListener(handleClick);
                    openPrivateWindow(sanitizedUrl);
                }
                notifications.onClicked.addListener(handleClick);
            });
        });
};

export const openInPrivate = (info) => {
    const { linkUrl: url } = info;
    const sanitizedUrl = sanitizeUrl(url);
    return openPrivateWindow(sanitizedUrl);
};

const sanitizeUrl = (url) => {
    const matches = url.match(/^https:\/\/.*facebook\.com\/.*\.php\?u=(.*)\&.*$/);
    if (null === matches) {
        console.warn(`This url doesn't seem to come from Facebook...`);
        return url;
    }
    if (null === matches[1]) {
        console.warn(`Failed to extract payload from url...`);
        return url;
    }
    const sanitizedUrl = decodeURIComponent(matches[1]);
    return sanitizedUrl;
};

/**
 * Open a private window for the given URL
 * @param {String} url 
 * @returns {Promise}
 */
const openPrivateWindow = (url) => {
    const data = {
        url: url,
        incognito: true,
    }
    return windows.create(data);
};