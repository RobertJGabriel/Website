const tweet = require('travis-tweet-update');
const package = require('./package.json');

let object = {
    version: package.version,
    name: 'Robert Gabriel.ninja',
    message: 'I just updated my website, check it out now!',
    link: package.homepage
};

let releaseType = 'minor';

tweet.update(object);

