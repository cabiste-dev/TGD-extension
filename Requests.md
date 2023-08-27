
# Explanation

There are 2 main values i did not hide `authorization` and `X-Client-Transaction-Id`, that's because they they are not user specific.

`authorization`: this is funnily a global value (verified it with other users) i think it's a duct tape solution for when they made the API paid only

`X-Client-Transaction-Id`: is a random string of 94 characters, it's not a hash but a weird combination of some, with a default format of `"{23-29 characters}+{56-62 letter}/{7 characters}"`, tho this really doesn't matter and twitter will accept any string as long as it's 94 characters long

legends:

- {{x}} -> Storage/cookies
- [[x]] -> Storage/IndexedDB/localforage
- ((x)) -> General information

*Note that not all the headers are required.*

## client event request

Post request, returns empty 200 if successful.

sent (but not required?) before any action on twitter.

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
    "x-client-transaction-id": ((random 94 characters string)),
    "x-client-uuid": [[device:rweb.dmCryptoKeysXXX.deviceId]] ((can be a random guid)),
    "x-csrf-token": {{ct0}},
    "x-twitter-active-user": "yes",
    "x-twitter-auth-type": "OAuth2Session",
    "x-twitter-client-language": "en"
  },
  "referrer": ((current page url but it doesnt affect anything)),
  "referrerPolicy": "strict-origin-when-cross-origin",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
```

## Mute request

Post request, returns 200 with a json body if successful.

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
    "x-client-transaction-id": ((random 94 characters string)),
    "x-client-uuid": [[device:rweb.dmCryptoKeysXXX.deviceId]] ((can be a random guid)),
    "x-csrf-token": {{ct0}},
    "x-twitter-active-user": "yes",
    "x-twitter-auth-type": "OAuth2Session",
    "x-twitter-client-language": "en"
  },
  "referrer": ((current page url but it doesnt affect anything)),
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

This request returns basic information about the account and is mainly used to get the user's ID under `data/user/result/rest_id` and to check if the user is already muted under `data/user/result/legacy/muting`

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
    "referrer": ((current page url but it doesnt affect anything)),
    "method": "GET",
    "mode": "cors"
})
```

**Example response:**

muted elon musk (please don't ban me)

```json
{
    "data": {
        "user": {
            "result": {
                "__typename": "User",
                "id": "VXNlcjo0NDE5NjM5Nw==",
                "rest_id": "44196397",
                "affiliates_highlighted_label": {
                    "label": {
                        "url": {
                            "url": "https://twitter.com/X",
                            "urlType": "DeepLink"
                        },
                        "badge": {
                            "url": "https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"
                        },
                        "description": "X",
                        "userLabelType": "BusinessLabel",
                        "userLabelDisplayType": "Badge"
                    }
                },
                "has_graduated_access": true,
                "is_blue_verified": true,
                "profile_image_shape": "Circle",
                "legacy": {
                    "following": true,
                    "muting": true,
                    "can_dm": false,
                    "can_media_tag": false,
                    "created_at": "Tue Jun 02 20:12:29 +0000 2009",
                    "default_profile": false,
                    "default_profile_image": false,
                    "description": "",
                    "entities": {
                        "description": {
                            "urls": []
                        }
                    },
                    "fast_followers_count": 0,
                    "favourites_count": 31131,
                    "followers_count": 154257287,
                    "friends_count": 415,
                    "has_custom_timelines": true,
                    "is_translator": false,
                    "listed_count": 126687,
                    "location": "\uD835\uDD4FÐ",
                    "media_count": 1669,
                    "name": "Elon Musk",
                    "normal_followers_count": 154257287,
                    "pinned_tweet_ids_str": [
                        "1694530708340138040"
                    ],
                    "possibly_sensitive": false,
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/44196397/1690621312",
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_normal.jpg",
                    "profile_interstitial_type": "",
                    "screen_name": "elonmusk",
                    "statuses_count": 29867,
                    "translator_type": "none",
                    "verified": false,
                    "want_retweets": true,
                    "withheld_in_countries": []
                },
                "professional": {
                    "rest_id": "1679729435447275522",
                    "professional_type": "Creator",
                    "category": []
                },
                "super_follow_eligible": true,
                "smart_blocked_by": false,
                "smart_blocking": false,
                "legacy_extended_profile": {},
                "is_profile_translatable": false,
                "has_hidden_subscriptions_on_profile": false,
                "verification_info": {
                    "reason": {
                        "description": {
                            "text": "This account is verified because it's an affiliate of @X on X. Learn more",
                            "entities": [
                                {
                                    "from_index": 54,
                                    "to_index": 56,
                                    "ref": {
                                        "url": "https://twitter.com/X",
                                        "url_type": "ExternalUrl"
                                    }
                                },
                                {
                                    "from_index": 63,
                                    "to_index": 73,
                                    "ref": {
                                        "url": "If a Blue Publisher charges readers for content, you’ll need to subscribe directly to their publication to read stories behind their paywall.s",
                                        "url_type": "ExternalUrl"
                                    }
                                }
                            ]
                        },
                        "verified_since_msec": "-156836000000000",
                        "override_verified_year": -3000
                    }
                },
                "highlights_info": {
                    "can_highlight_tweets": true,
                    "highlighted_tweets": "29"
                },
                "business_account": {},
                "creator_subscriptions_count": 120
            }
        }
    }
}
```
