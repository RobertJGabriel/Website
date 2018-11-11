'use strict';

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _config = require('./twitter_config/config.js');

var _config2 = _interopRequireDefault(_config);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var T = new _twitter2.default(_config2.default);
var homepage = _package2.default.homepage;
var name = _package2.default.name;
var version = _package2.default.version;

var message = { status: 'I just released ' + version + ' of ' + name + '. Check it out here ' + homepage };

T.post('statuses/update', message, function (error, tweet, response) {
    // If the favorite fails, log the error message
    if (error) {
        console.log(err);
    }
    // If the favorite is successful, log the url of the tweet
    else {
            console.table(tweet); // Tweet body.
            console.table(response); // Raw response object.
            var username = response.user.screen_name;
            var tweetId = response.id_str;
            console.log('Favorited: ', 'https://twitter.com/' + username + '/status/' + tweetId);
        }
});