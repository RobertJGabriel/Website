import Twitter from 'twitter';
import config from './twitter_config/onfig.js';
import package from 'package.json';
const T = new Twitter(config);
let homepage = package.homepage;
let name = package.name;
let version = package.version;

let message = {status: `I just released ${version} of ${name}. Check it out here ${homepage}`};

T.post('statuses/update', message, function(error, tweet, response) {
    // If the favorite fails, log the error message
    if (error) {
        console.log(err);
    }
    // If the favorite is successful, log the url of the tweet
    else {
        console.table(tweet);  // Tweet body.
        console.table(response);  // Raw response object.
        let username = response.user.screen_name;
        let tweetId = response.id_str;
        console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
    }
});