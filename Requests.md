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

## Get User Request

Post request, returns 200 with a json body if successful.

*This one has the goofiest URL (i'll see if i can clean it up)*

This request returns basic information about the account and is mainly used to get the user's ID under `data/user/result/rest_id`

```js
fetch(`https://twitter.com/i/api/graphql/SAMkL5y_N9pmahSw8yy6gw/UserByScreenName?variables=%7B%22screen_name%22%3A%22${username}%22%2C%22withSafetyModeUserFields%22%3Atrue%7D&features=%7B%22hidden_profile_likes_enabled%22%3Afalse%2C%22hidden_profile_subscriptions_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22subscriptions_verification_info_is_identity_verified_enabled%22%3Afalse%2C%22subscriptions_verification_info_verified_since_enabled%22%3Atrue%2C%22highlights_tweets_tab_ui_enabled%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D&fieldToggles=%7B%22withAuxiliaryUserLabels%22%3Afalse%7D`, {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/116.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "x-csrf-token": {{ct0}},
        "x-guest-token": "1693315023072804864",
        "x-twitter-client-language": "en",
        "x-twitter-active-user": "yes",
        "X-Client-Transaction-Id": [[device:rweb.dmCryptoKeysXXX.deviceId]] ((can be a random guid)),
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "referrer": "https://twitter.com/home",
    "method": "GET",
    "mode": "cors"
})
```

**Example response:**

```json
{
    "data": {
        "user": {
            "result": {
                "__typename": "User",
                "id": "VXNlcjoxMjMwNjc2MjE4NzcwNTc5NDU2",
                "rest_id": "1230676218770579456",
                "affiliates_highlighted_label": {},
                "has_graduated_access": true,
                "is_blue_verified": true,
                "profile_image_shape": "Circle",
                "legacy": {
                    "can_dm": true,
                    "can_media_tag": true,
                    "created_at": "Fri Feb 21 02:10:58 +0000 2020",
                    "default_profile": true,
                    "default_profile_image": false,
                    "description": "Sports + Business | Investing at Pomp Investments | Host of The Joe Pomp Show | Join 100,000+ others and sign up for my free newsletter: https://t.co/jw1SiKBsmh",
                    "entities": {
                        "description": {
                            "urls": [
                                {
                                    "display_url": "readhuddleup.com",
                                    "expanded_url": "http://readhuddleup.com",
                                    "url": "https://t.co/jw1SiKBsmh",
                                    "indices": [
                                        137,
                                        160
                                    ]
                                }
                            ]
                        },
                        "url": {
                            "urls": [
                                {
                                    "display_url": "joepompliano.com",
                                    "expanded_url": "https://www.joepompliano.com/",
                                    "url": "https://t.co/8rwBk6ES7u",
                                    "indices": [
                                        0,
                                        23
                                    ]
                                }
                            ]
                        }
                    },
                    "fast_followers_count": 0,
                    "favourites_count": 88313,
                    "followers_count": 556831,
                    "friends_count": 1590,
                    "has_custom_timelines": true,
                    "is_translator": false,
                    "listed_count": 3060,
                    "location": "",
                    "media_count": 4519,
                    "name": "Joe Pompliano",
                    "normal_followers_count": 556831,
                    "pinned_tweet_ids_str": [
                        "1400245761854652417"
                    ],
                    "possibly_sensitive": false,
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/1230676218770579456/1634679162",
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1482849191214915587/o-aZo4xw_normal.jpg",
                    "profile_interstitial_type": "",
                    "screen_name": "JoePompliano",
                    "statuses_count": 18092,
                    "translator_type": "none",
                    "url": "https://t.co/8rwBk6ES7u",
                    "verified": false,
                    "want_retweets": false,
                    "withheld_in_countries": []
                },
                "smart_blocked_by": false,
                "smart_blocking": false,
                "legacy_extended_profile": {},
                "is_profile_translatable": false,
                "has_hidden_subscriptions_on_profile": false,
                "verification_info": {
                    "reason": {
                        "description": {
                            "text": "This account is verified. Learn more",
                            "entities": [
                                {
                                    "from_index": 26,
                                    "to_index": 36,
                                    "ref": {
                                        "url": "https://help.twitter.com/managing-your-account/about-twitter-verified-accounts",
                                        "url_type": "ExternalUrl"
                                    }
                                }
                            ]
                        },
                        "verified_since_msec": "1624362789948"
                    }
                },
                "highlights_info": {
                    "can_highlight_tweets": true,
                    "highlighted_tweets": "0"
                },
                "business_account": {},
                "creator_subscriptions_count": 0
            }
        }
    }
}
```