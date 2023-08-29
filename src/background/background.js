import { GenerateGuid, Sleep, GetAllGimmicks } from "../assets/js/General.js";
import { SendMuteRequest } from "../assets/js/TwitterServices.js";
import { Notify } from "../assets/js/BrowserServices.js";

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

function Test() {
    Notify("test title", "test message");
}

/**
 * Handles muting users, sends a notification when it's finished.
 */
async function MuteUsers() {
    let gimmicks = await GetAllGimmicks();
    let uuid = GenerateGuid();
    let amountMuted = 0;

    for (let i = 0; i < gimmicks.length; i++) {
        let gimmick = gimmicks[i];

        let muted = await SendMuteRequest(gimmick, uuid);

        // sleep if the user was muted to not get blocked by the api (if that even happens)
        if (muted) {
            amountMuted++;
            await Sleep(1000);
        }
    }

    if (amountMuted === 0) {
        Notify("No Accounts Muted!", "All accounts were already muted!");
    } else {
        Notify("Accounts muted!", `Finished muting ${amountMuted} accounts.`);
    }
}
