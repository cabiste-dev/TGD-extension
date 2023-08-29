//!---------------------------------------------------
//! This file contains calls to the twitter API v1.1 |
//!---------------------------------------------------


import { GetCookieByName } from "./BrowserServices.js";

/**
 * Checks if there's a logged in account on twitter.
 * @returns boolean
 */
export async function IsLoggedIn() {
    try {
        // "auth_token" is your actual token, idk why "ct0" is used instead of it
        // "auth_token" only exist if you're logged in
        await GetCookieByName("auth_token");
        return true;
    } catch {
        return false;
    }
}

/**
 * calls the twitter API endpoint for a client event (this is currently not needed)
 * @param {cookie[]} cookies the cookies of the currently logged in user
 * @param {string} uuid a random GUID acting like the device's ID
 */
export async function SendClientEvent(cookies, uuid) {
    await fetch("https://twitter.com/i/api/1.1/jot/client_event.json?keepalive=false", {
        "headers": {
            "accept": "*/*",
            "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "pragma": "no-cache",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-client-transaction-id": GenerateClientTransaction(),
            "x-client-uuid": uuid,
            "x-csrf-token": cookies.find(cookie => cookie.name === "ct0").value,
            "x-twitter-active-user": "yes",
            "x-twitter-auth-type": "OAuth2Session",
            "x-twitter-client-language": "en"
        },
        "referrer": "https://twitter.com/home",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
}

/**
 * calls the twitter API endpoint for muting a user
 * @param {string} gimmick username without the @
 * @param {string} uuid a random GUID acting like the device's ID
 * @returns {boolean} true if the user was muted and false if they're already muted / can't be muted
 */
export async function SendMuteRequest(gimmick, uuid) {
    let userData = await GetUserData(gimmick);

    let isMuted;
    // this so it doesn't break if the account is suspended
    try {
        isMuted = userData["user"]["result"]["legacy"]["muting"];
    } catch (error) {
        isMuted = true;
    }

    if (isMuted) {
        console.log(`${gimmick} is already muted`);
        return false;
    }

    let userId = userData["user"]["result"]["rest_id"];

    await fetch("https://twitter.com/i/api/1.1/mutes/users/create.json", {
        "headers": {
            "accept": "*/*",
            "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "pragma": "no-cache",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-client-transaction-id": GenerateClientTransaction(),
            "x-client-uuid": uuid,
            "x-csrf-token": await GetCookieByName("ct0"),
            "x-twitter-active-user": "yes",
            "x-twitter-auth-type": "OAuth2Session",
            "x-twitter-client-language": "en"
        },
        "referrer": "https://twitter.com/home",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `user_id=${userId}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    return true;
}

/**
 * gets a twitter user's public data
 * @param {string} username username without the @
 * @param {string} token the token of the currently logged in user (cookies -> ct0)
 * @returns json (see Requests.md#Get User Request)
 */
async function GetUserData(username) {
    let userData = "";

    await fetch(`https://twitter.com/i/api/graphql/G3KGOASz96M-Qu0nwmGXNg/UserByScreenName?variables=%7B%22screen_name%22%3A%22${username}%22%2C%22withSafetyModeUserFields%22%3Atrue%7D&features=%7B%22hidden_profile_likes_enabled%22%3Afalse%2C%22hidden_profile_subscriptions_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22subscriptions_verification_info_is_identity_verified_enabled%22%3Afalse%2C%22subscriptions_verification_info_verified_since_enabled%22%3Afalse%2C%22highlights_tweets_tab_ui_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Afalse%7D&fieldToggles=%7B%22withAuxiliaryUserLabels%22%3Afalse%7D`, {
        "credentials": "include",
        "headers": {
            "Accept": "*/*",
            "content-type": "application/json",
            "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
            "x-csrf-token": await GetCookieByName("ct0"),
            "x-twitter-client-language": "en",
            "x-twitter-active-user": "yes",
            "X-Client-Transaction-Id": GenerateClientTransaction(),
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        "referrer": "https://twitter.com/home",
        "method": "GET",
        "mode": "cors"
    }).then((response) => response.json()).then((data) => userData = data["data"]);
    return userData;
}

/**
 * generates a random string that can be used as a transaction "id"
 * @returns a 94 character string
 */
function GenerateClientTransaction() {
    let result = '';
    let length = 94;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
