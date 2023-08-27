import {SendMuteEvent} from "../assets/js/TwitterApi.js";

// chrome.runtime.onInstalled.addListener(function () {
//     chrome.contextMenus.create({
//         "id": "sampleContextMenu",
//         "title": "Sample Context Menu",
//         "contexts": ["selection"]
//     });
// });

// thanks to https://github.com/moshfeu/chrome-extension-notification-demo
chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'test') {
        Test();
    }
    if (data.type === 'mute') {
        MuteUsers();
    }
});

var cookies;
LoadTwitterCookies();

async function Test() {
    console.log(cookies.find(cookie => cookie.name === "ct0").value);
    // options.callBack("dab");
    // alert(cookies.find(cookie => cookie.name === "ct0").value);
}

async function MuteUsers() {
    let gimmicks = await GetAllGimmicks();
    // we only need 1 uuid
    let uuid = GenerateGuid();

    for (let i = 0; i < gimmicks.length; i++) {
        let gimmick = gimmicks[i];
        // await SendClientEvent(cookies, uuid);
        let muted = await SendMuteEvent(gimmick, cookies, uuid);
        // sleep if the user was muted to not get blocked by the api (if that even happens)
        if (muted) {
            await sleep(1000);
        }
    }
    alert("Finished muting all accounts");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Loads the twitter cookies into memory
 */
function LoadTwitterCookies() {
    chrome.cookies.getAll({ domain: "twitter.com" }, function (data) {
        cookies = data;
    });
}

/**
 * Fetches a list
 * @returns an array of usernames to block
 */
async function GetAllGimmicks() {
    let data = [];

    await fetch("https://raw.githubusercontent.com/cabiste69/TGD-extension/main/GimmickList.txt").then((response) => response.text())
        .then((json) => data = json.split("\n"));

    return data;
}

/**
 * generates a random guid v4,
 * Thanks to https://stackoverflow.com/a/2117523/12429279
 * @returns a random GUID as string
 */
function GenerateGuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}