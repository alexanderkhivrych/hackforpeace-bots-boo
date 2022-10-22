import { Client } from "twitter-api-sdk";

const postId = '1583369158473166848';
const MAX_REPLIES_COUNT = 100;
const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAIHPiQEAAAAAv0gObyLOCFdvSWLRTbmGMETnwnM%3DP6HJhJIqdK1SyPhG2tliomKQVBEQv0uTr0NNyIA5mqAncZJtE5';
const client = new Client(BEARER_TOKEN);


const getTwitterData = async () => {
///Get replies
const { data } = await client.tweets.tweetsRecentSearch({ sort_order: 'relevancy', query: "conversation_id:1583369158473166848", max_results: 100, "tweet.fields": ["author_id", "entities"]});

const userIds = data.map(user => user.author_id);

console.log(userIds);
const result = [];

const lookupRequest =  client.users.findUsersById({
  "ids": userIds,
  "user.fields": [
    "created_at",
    "description",
    "entities",
    "id",
    "location",
    "name",
    "pinned_tweet_id",
    "profile_image_url",
    "protected",
    "public_metrics",
    "url",
    "username",
    "verified",
    "withheld"
],
});

const usersTimelinesRequests = await client.tweets.usersIdTweets(userIds[1], {
  // "tweet.fields": [
  //   "attachments",
  //   "author_id",
  //   "context_annotations",
  //   "conversation_id",
  //   "created_at",
  //   "edit_controls",
  //   "edit_history_tweet_ids",
  //   "entities",
  //   "geo",
  //   "id",
  //   "in_reply_to_user_id",
  //   "lang",
  //   "non_public_metrics",
  //   "organic_metrics",
  //   "possibly_sensitive",
  //   "promoted_metrics",
  //   "public_metrics",
  //   "referenced_tweets",
  //   "reply_settings",
  //   "source",
  //   "text",
  //   "withheld"
// ],
// "media.fields": [
//     "alt_text",
//     "duration_ms",
//     "height",
//     "media_key",
//     "non_public_metrics",
//     "organic_metrics",
//     "preview_image_url",
//     "promoted_metrics",
//     "public_metrics",
//     "type",
//     "url",
//     "variants",
//     "width"
// ],
"poll.fields": [
    "duration_minutes",
    "end_datetime",
    "id",
    "options",
    "voting_status"
],
"user.fields": [
    "created_at",
    "description",
    "entities",
    "id",
    "location",
    "name",
    "pinned_tweet_id",
    "profile_image_url",
    "protected",
    "public_metrics",
    "url",
    "username",
    "verified",
    "withheld"
],
"place.fields": [
    "contained_within",
    "country",
    "country_code",
    "full_name",
    "geo",
    "id",
    "name",
    "place_type"
]
});

const usersMentionsRequests = await Promise.all(userIds.map((id) => client.tweets.usersIdMentions(id).then(({ data: d }) => d)));

// const [usersTimelines, usersMentions, usersData]= await Promise.all([usersTimelinesRequests, usersMentionsRequests, lookupRequest]);

console.log("response", JSON.stringify(usersMentionsRequests.slice(0, 5)));



///Get usres data




// Get Usres Timelines



// Get Usres Mnetions


// return  mapped reslut


return result;

}

getTwitterData();

export { getTwitterData };
