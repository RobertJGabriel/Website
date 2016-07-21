

MrScraper pases the text from any website and returns it as an array.


## Install

```
$ npm install --save mrscraper
```

## Usage

```js
var mrscraper = require("./mrscraper.js");
var chalk = require('chalk');

mrscraper("http://www.tested.com", function (response) {

    console.log(chalk.blue(response));

});

```


## Test
Run the following to try it out 

```js
npm test

```


## License

MIT © [Robert Gabriel](http://www.projectbird.com) 
