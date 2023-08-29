//!--------------------------------------------------------------------
//! This file contains functions that are used throughout the project |
//! and are independent of everything else                            |
//!--------------------------------------------------------------------


/**
 * Pauses the program for the specified amount of time.
 * @param {number} ms Time in milliseconds.
 */
export function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * generates a random guid v4.
 *
 * Thanks to https://stackoverflow.com/a/2117523/12429279
 * @returns a random GUID as string
 */
export function GenerateGuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

/**
 * Gets All the usernames of the gimmick accounts to mute.
 * @returns an array of usernames
 */
export async function GetAllGimmicks() {
    let data = [];

    await fetch("https://raw.githubusercontent.com/cabiste69/TGD-extension/main/GimmickList.txt").then((response) => response.text())
        .then((json) => data = json.split("\n"));

    return data;
}
