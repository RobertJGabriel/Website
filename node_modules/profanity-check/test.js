var profanity = require("./profanity.js");
var chalk = require('chalk');
var stdin = process.openStdin();


console.log(chalk.red("Please enter a word"));

stdin.addListener("data", function (d) {
    console.log("you entered: " + d.toString().trim() + "");
    runTest(d.toString().trim());

});

function runTest(word) {

    profanity(word, function (response) {
        if (response === "false") {
            console.log(chalk.blue(response));
        } else {
            console.log(chalk.red(response));
        }
        process.exit();
    });

}