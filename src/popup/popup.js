


document.getElementById("button_mute").addEventListener("click", MuteButton_Clicked);
document.getElementById("button_test").addEventListener("click", Test);

// Initialize some stuff on opening the popup

PopulatePopup();

/**
 * for debugging random stuff
*/
async function Test() {
    chrome.runtime.sendMessage('', {
        type: 'test'
    });
}

/**
 * mutes all the users
*/
async function MuteButton_Clicked() {
    chrome.runtime.sendMessage('', {
        type: 'mute'
    });
}

/**
 * since elon is removing blocking i guess this is not gonna be needed
*/
// function BlockAll() {
// }


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

async function GetAllGimmicks() {
    let data = [];

    await fetch("https://raw.githubusercontent.com/cabiste69/TGD-extension/main/GimmickList.txt").then((response) => response.text())
        .then((json) => data = json.split("\n"));

    return data;
}