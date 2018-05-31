# robertgabriel.ninja website [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  <span class="badge-patreon"><a href="https://www.patreon.com/robertjgabriel" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
> Personal pwa website for robertgabriel.ninja. Feel free to use the set. 98% in lighthouse

<img src="./screenshot.png" width="752">



## Installation

```sh
$ npm install --save github-issue-logger
```

## Usage

```js
const githubIssueLogger = require('github-issue-logger');

  githubIssueLogger.setToken('github personal token');

  const repoName = 'app-seo-checks';
  const repoOwner = 'robertjgabriel';
  const issueTitle = 'Issue title';
  const issueBody = 'More details';

  githubIssueLogger.createIssue(repoName, repoOwner, issueTitle, issueBody).then(data =>{
    console.log(data);// See repsonses
  }); 
  // This will return and object.
```

## Responses

### On Error

```js

    { 
      extra: '',
      status: 'error',
      url: 'https://api.github.com/repos/robertjgabriel/app-seo-checka/issues'
    }
```

### On incorrect setup

```js

    { 
      extra: '',
      status: 'Not Found',
      url: 'https://api.github.com/repos/robertjgabriel/app-seo-checka/issues'
    }
```

### On Success

```js
    { 
      extra: '',
      status: 'Created',
      url: 'https://api.github.com/repos/robertjgabriel/app-seo-checka/issues'
    }
```

## Getting github personal token.

### How to 

Clear more [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

### Set environment variable
```js
process.env.githubPersonalToken = 'Token'
```


## License

MIT © [Robert James Gabriel](https://www.robertgabriel.ninja)


[npm-image]: https://badge.fury.io/js/github-issue-logger.svg
[npm-url]: https://npmjs.org/package/github-issue-logger
[travis-image]: https://travis-ci.org/RobertJGabriel/github-issue-logger.svg?branch=master
[travis-url]: https://www.travis-ci.com/RobertJGabriel/github-issue-logger
[daviddm-image]: https://david-dm.org/RobertJGabriel/github-issue-logger.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/RobertJGabriel/github-issue-logger
[coveralls-image]: https://coveralls.io/repos/RobertJGabriel/github-issue-logger/badge.svg
[coveralls-url]: https://coveralls.io/r/RobertJGabriel/github-issue-logger
