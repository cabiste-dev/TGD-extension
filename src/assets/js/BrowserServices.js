//!------------------------------------------------------------------
//! This file contains all functions that require the browser's API |
//!------------------------------------------------------------------


/**
 * Get twitter cookie by name
 * @param {string} cookieName the name of the cookie to retrieve
 * @returns cookie's value if it exist. | raises an error if the cookie doesn't exist.
 */
export async function GetCookieByName(cookieName) {

    return new Promise((resolve, reject) => {
        chrome.cookies
            .getAll({ domain: "twitter.com" }, (cookies) => {
                if (cookies.length > 0) {
                    try {
                        let cookieValue = cookies.find(cookie => cookie.name === cookieName).value;
                        resolve(cookieValue);
                    } catch {
                        reject(`[${cookieName}] does not exist!`);
                    }
                } else {
                    reject("there are no cookies on this browser!");
                }
            })
    })
}

/**
 * Creates a browser notification.
 *
 * https://developer.chrome.com/docs/extensions/reference/notifications/
 * @param {string} customTitle The title of the notification.
 * @param {string} customMessage The body of the notification.
 */
export function Notify(customTitle, customMessage) {
    chrome.notifications.create(
        customTitle,
        {
            type: "basic",
            title: customTitle,
            message: customMessage,
            iconUrl: "../assets/images/icons/icon128.png"
        }
    );
}
