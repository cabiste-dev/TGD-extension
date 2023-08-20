# Explanation

as you can see below there are 2 main values i did not hide `authorization` and `X-Client-Transaction-Id`, that's because they they are not user specific.

`X-Client-Transaction-Id`: this is a random string of 94 characters, it's not a hash but a weird combination of some, with a format of `"{23-29 characters}+{56-62 letter}/{7 characters}"`

`authorization`: this is funilly a global value (verifed it with other users) i think it's a duct tape solution for when they made the API paid only

legends:

- {{x}} -> Application/cookies
- [[x]] -> Application/IndexedDB/localforage
- ((x)) -> general

## client event request

Post request, returns empty 200 if successful.

required before any action on twitter also note that not all the headers are required.

```js
fetch("https://twitter.com/i/api/1.1/jot/client_event.json?keepalive=false", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"115\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-client-transaction-id": "yvYYei1nJQj7Kg/dJgDqQ3w+jxjSPsK2Hnof5vCfJ3UcqkKx8pKmh2NFDfNAOXmZbROvW8rdsqaHf0QPXfAhcd/QnYu/yw",
    "x-client-uuid": [[device:rweb.dmCryptoKeysXXX.deviceId]] ((can be a random guid)),
    "x-csrf-token": {{ct0}},
    "x-twitter-active-user": "yes",
    "x-twitter-auth-type": "OAuth2Session",
    "x-twitter-client-language": "en"
  },
  "referrer": ((current page url)),
  "referrerPolicy": "strict-origin-when-cross-origin",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
```


## Mute request

Post request, returns 200 with a json body if successful.

this is the actual mute request.

```js
fetch("https://twitter.com/i/api/1.1/mutes/users/create.json", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"115\", \"Not/A)Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-client-transaction-id": "lqpEJnE7eVSndlOBely2HyBi00SOYp7qQiZDuqzDeylA9h7trs762z8ZUa8cZSXFMU/zB5aQH3vma2ZOgfG/LexkQ/A9lw",
    "x-client-uuid": [[device:rweb.dmCryptoKeysXXX.deviceId]] ((can be a random guid)),
    "x-csrf-token": {{ct0}},
    "x-twitter-active-user": "yes",
    "x-twitter-auth-type": "OAuth2Session",
    "x-twitter-client-language": "en"
  },
  "referrer": ((current page url)),
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "user_id=((id of the user to mute))",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
```
