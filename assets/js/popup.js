import { SendClientEvent, SendMuteEvent } from "./TwitterApi.js";

// document.getElementById("button_block").addEventListener("click", BlockAll);
document.getElementById("button_mute").addEventListener("click", MuteAll);

/**
 * Well since elon is removing blocking i guess this is not gonna be needed
 */
// function BlockAll() {
// }


async function MuteAll() {
    let cookies = await GetAllTwitterCookies();
    let uuid = GenerateGuid();
    let gimmicks = await GetAllGimmicks();
    for (let i = 0; i < gimmicks.length; i++) {
        let gimmick = gimmicks[i];
        // await SendClientEvent(cookies, uuid);
        await SendMuteEvent(gimmick, cookies, uuid);
        await sleep(1000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * gets all the cookies of twitter
 * @returns an array of cookies
 */
async function GetAllTwitterCookies() {
    let cookies = await chrome.cookies.getAll({ domain: "twitter.com" });

    return cookies.filter(cookie => cookie.domain === ".twitter.com");
}

async function GetAllGimmicks() {
    let data = [];

    await fetch("https://raw.githubusercontent.com/cabiste69/DTG-extension/main/GimmickList.txt").then((response) => response.text())
        .then((json) => data = json.split("\n"));

    return data;

}

function FormatCookies(cookies) {
    let text = "";
    for (let i = 0; i < cookies.length; i++) {
        text += `${cookies[i].name}=${cookies[i].value}; `;
    }
    return text;
}

function GenerateGuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}



