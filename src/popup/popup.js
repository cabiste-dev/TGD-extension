
import { IsLoggedIn } from "../assets/js/TwitterServices.js";
import { GetAllGimmicks } from "../assets/js/General.js";
import { Notify } from "../assets/js/BrowserServices.js";

document.getElementById("button_mute").addEventListener("click", MuteButton_Clicked);
// document.getElementById("button_test").addEventListener("click", Test);

// Initialize some stuff on opening the popup

PopulatePopup();

/**
 * for debugging random stuff
*/
async function Test() {
    // chrome.runtime.sendMessage('', {
    //     type: 'test'
    // });

    let isLoggedIn = await IsLoggedIn();
    if (!isLoggedIn) {
        Notify("Login Required!", "You need to be logged in to twitter for the extension to work!");
        return;
    }
    Notify("Logged in!", "You're logged in");
}

/**
 * Sends a mute event when the "mute all" button is clicked.
*/
async function MuteButton_Clicked() {
    let isLoggedIn = await IsLoggedIn();
    if (!isLoggedIn) {
        Notify("Login Required!", "You need to be logged in to twitter for the extension to work!");
        return;
    }

    chrome.runtime.sendMessage('', {
        type: 'mute'
    });
}

/**
 * Populates the popup with the names of the users to mute
 */
async function PopulatePopup() {
    let gimmicks = await GetAllGimmicks();

    let gimmicksCount = document.getElementById("gimmick_count");
    gimmicksCount.innerText = gimmicks.length;

    let gimmicksListElement = document.getElementById("gimmick_list");

    for (let i = 0; i < gimmicks.length; i++) {
        let gimmick = gimmicks[i];

        // create the link
        let gimmickLink = document.createElement("a");
        gimmickLink.innerText = `@${gimmick}`;
        gimmickLink.href = `https://twitter.com/${gimmick}`;
        gimmickLink.target = "_blank";
        gimmickLink.className = "link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover";

        // create the list item
        let gimmickElement = document.createElement("li");
        gimmickElement.appendChild(gimmickLink);

        // add it to the list
        gimmicksListElement.appendChild(gimmickElement);
    }
}
