

Profanity rates and reviews the text on a website, to see if its suitable and giving the website a Profanity rating. It's speedy and generates a JSON responce with a profanity rating, percentage and all Profanity words .


## Install

```
$ npm install --save profanity
```

## Usage

```js
var profanity = require("./profanity.js");
var chalk = require('chalk');



    profanity("sex", function (response) {
        if (response === "false") {
            console.log(chalk.blue(response));
        } else {
            console.log(chalk.red(response));
        }
    });

```

## Team

[![Robert Gabriel](https://avatars2.githubusercontent.com/u/6218780?v=3&s=460)](http://www.projectbird.com) | 
---|---
[Robert Gabriel](http://www.projectbird.com)  |


## License

MIT © [Robert Gabriel](http://www.projectbird.com) 
