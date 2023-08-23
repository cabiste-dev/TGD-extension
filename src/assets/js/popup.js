import { SendClientEvent, SendMuteEvent } from "./TwitterApi.js";

document.getElementById("button_mute").addEventListener("click", MuteAll);
// document.getElementById("button_test").addEventListener("click", Test);

var cookies;
GetTwitterCookies();
PopulatePopup();

/**
 * Well since elon is removing blocking i guess this is not gonna be needed
*/
// function BlockAll() {
// }

async function Test() {
    let gimmies = await GetAllGimmicks();
    console.log(gimmies);
    for (let i = 0; i < gimmies.length; i++) {
        window.open( `https://twitter.com/${gimmies[i]}`);
    }
}

async function MuteAll() {
    let uuid = GenerateGuid();
    let gimmicks = await GetAllGimmicks();

    for (let i = 0; i < gimmicks.length; i++) {
        let gimmick = gimmicks[i];
        // await SendClientEvent(cookies, uuid);
        let muted = await SendMuteEvent(gimmick, cookies, uuid);
        if (muted) {
            await sleep(1000);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * gets all the cookies of twitter
 * @returns an array of cookies
 */
function GetTwitterCookies() {
    chrome.cookies.getAll({ domain: "twitter.com" }, function (data) {
        cookies = data;
    });
}

async function GetAllGimmicks() {
    let data = [];

    await fetch("https://raw.githubusercontent.com/cabiste69/TGD-extension/main/GimmickList.txt").then((response) => response.text())
        .then((json) => data = json.split("\n"));

    return data;
}

function GenerateGuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function PopulatePopup() {
    let gimmicks = await GetAllGimmicks();
    let gimmicksListElement = document.getElementById("gimmick_list");
    let gimmicksCount = document.getElementById("gimmick_count");
    gimmicksCount.innerText = gimmicks.length;

    for (let i = 0; i < gimmicks.length; i++) {
        let gimmick = gimmicks[i];

        // create the link
        let gimmickLink = document.createElement("a");
        gimmickLink.innerText = gimmick;
        gimmickLink.href = `https://twitter.com/${gimmick}`;
        gimmickLink.target = "_blank";

        // create the list item
        let gimmickElement = document.createElement("li");
        gimmickElement.appendChild(gimmickLink);

        // add it to the list
        gimmicksListElement.appendChild(gimmickElement);
    }
}
