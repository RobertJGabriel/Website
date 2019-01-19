const data = require('./redirects/redirects.json');
const path = require('path');
const rootDir = path.join(__dirname, '../../');
const Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'));

/**
 * @param  {} file
 * @param  {} dir2
 */
const moveFile = (key, jsonData) => {
    //include the fs, path modules
    fs.readFileAsync(`${rootDir}__core/tasks/redirects/template.html`, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace('{{newUrl}}', `https://www.robertgabriel.ninja/${jsonData[key]}`);
        fs.writeFileAsync(`${rootDir}dist/${key}.html`, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });

    });
};

/**
 * @param  {} jsonString
 */
let parseJsonAsync = (jsonString) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(jsonString)
        });
    });
};


parseJsonAsync(data).then(jsonData => {
    for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            console.log(key + " -> " + jsonData[key]);
            moveFile(key,jsonData);
        }
    }
}).then(result => {

    console.log(result);
});