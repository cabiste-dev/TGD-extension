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
  "body": "user_id=((id of the user to mute, this is not needed))",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
```


example response (muting @riotgames):

```json
{
    "id": 20523846,
    "id_str": "20523846",
    "name": "Riot Games",
    "screen_name": "riotgames",
    "location": "Santa Monica, CA",
    "description": "\ud83d\udd79\ufe0f @leagueoflegends @TFT @PlayRuneterra @Wildrift @VALORANT @riotforge\n\ud83c\udf7f @lolesports @valorantesports @arcaneshow \n\ud83c\udfa7 @riotgamesmusic\u00a0\n\ud83d\udee0 @RiotSupport\n\ud83d\udc4a",
    "url": null,
    "entities": {
        "description": {
            "urls": []
        }
    },
    "protected": false,
    "followers_count": 2788262,
    "fast_followers_count": 0,
    "normal_followers_count": 2788262,
    "friends_count": 261,
    "listed_count": 4173,
    "created_at": "Tue Feb 10 16:30:49 +0000 2009",
    "favourites_count": 8603,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": true,
    "verified": false,
    "statuses_count": 4765,
    "media_count": 948,
    "lang": null,
    "status": {
        "created_at": "Fri Aug 18 19:56:54 +0000 2023",
        "id": 1692626646451511415,
        "id_str": "1692626646451511415",
        "text": "@TatsuWr Big play \ud83d\udc4a",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "TatsuWr",
                    "name": "TatsuWR",
                    "id": 1468228466231418894,
                    "id_str": "1468228466231418894",
                    "indices": [
                        0,
                        8
                    ]
                }
            ],
            "urls": []
        },
        "source": "\u003ca href=\"https:\/\/mobile.twitter.com\" rel=\"nofollow\"\u003eTwitter Web App\u003c\/a\u003e",
        "in_reply_to_status_id": 1692542254873710824,
        "in_reply_to_status_id_str": "1692542254873710824",
        "in_reply_to_user_id": 1468228466231418894,
        "in_reply_to_user_id_str": "1468228466231418894",
        "in_reply_to_screen_name": "TatsuWr",
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 12,
        "favorited": false,
        "retweeted": false,
        "lang": "en",
        "supplemental_language": null
    },
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "131516",
    "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme14\/bg.gif",
    "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme14\/bg.gif",
    "profile_background_tile": true,
    "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/1674851403297333248\/68Cya2zp_normal.jpg",
    "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/1674851403297333248\/68Cya2zp_normal.jpg",
    "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/20523846\/1689183708",
    "profile_link_color": "080808",
    "profile_sidebar_border_color": "FFFFFF",
    "profile_sidebar_fill_color": "DDEEF6",
    "profile_text_color": "333333",
    "profile_use_background_image": false,
    "has_extended_profile": false,
    "default_profile": false,
    "default_profile_image": false,
    "pinned_tweet_ids": [],
    "pinned_tweet_ids_str": [],
    "has_custom_timelines": true,
    "can_media_tag": true,
    "followed_by": false,
    "following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "advertiser_account_type": "none",
    "advertiser_account_service_levels": [],
    "business_profile_state": "none",
    "translator_type": "none",
    "withheld_in_countries": [],
    "require_some_consent": false
}
```
