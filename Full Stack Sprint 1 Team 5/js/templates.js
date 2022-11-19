let initText = `
app init <command>

Usage:

app init --all                                    creates the folder structure and config file, will create views folder if not created already.
app init --mk                                     creates the folder structure and add usage files
app init --cat                                    creates the config.json file with default settings
app init --jsontxt                                creates the text.json file with default settings
app init --text                                   creates the text.txt file with default settings
app init --token                                  creates the userdata.json file with default settings
`;

let tokenText = `
app token <command>

Usage:

app token --show                                   shows all current tokens saved in userdata.json file
app token --add                                    adds a new token to the file
app token --reset                                  resets the userdata.json back to default
app token --check <username>                       returns the crc of the given <username>
`;


let configText = `
app config <command>

Usage:

app config --show                                  displays a list of the current config settings
app config --reset                                 resets the config file with default settings
app config --set <key> <data>                      sets a specific config setting
`;

let jsonText = `
app json <command>

Usage: 
app json --show                                    displays the current json text file
app json --set <json key> <updated data>           sets data in json file
app json --reset                                   resets the json text file
`;

let textText = `
app text <command>

Usage: 
app text --show                                    displays the current text file
app text --set all <updated data>                  sets data in the text file
app text --reset                                   resets the text file
`;

let usageText = `
app init <command>

Usage:

app init --all                                     creates the folder structure and config file
app init --mk                                      creates the folder structure
app init --cat                                     creates the config file with default settings

app config --show                                  displays a list of the current config settings
app config --reset                                 resets the config file with default settings
app config --set <config key> <updated data>       sets a specific config setting

app json --show                                    displays the current json text file
app json --set <json key> <updated data>           sets data in json file
app json --reset                                   resets the json text file

app text --show                                    displays the current text file
app text --set all <updated data>                  sets data in the text file
app text --reset                                   resets the text file

app token --show                                   shows all current tokens saved in userdata.json file
app token --add                                    adds a new token to the file
app token --reset                                  resets the userdata.json back to default
app token --check <username>                       returns the crc of the given <username>
app token --help                                   show the token.js help file 

`

const configJson = { 
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the App.',
    main: 'app.js',
    superuser: 'adm1n'
};

const configJsonfile = { 
    firstname: '',
    lastname: '',
    job: '',
    year: '',
};

let configTextFile = `
This is some text
`
let Token = JSON.parse(`[
{
    "created": "1969-01-31 12:30:00",
    "username": "username",
    "email": "user@example.com",
    "phone": "7096548900",
    "token": "token",
    "expires": "1969-02-03 12:30:00",
    "confirmed": "tbd"
}
]`);

indexjsText = `import {usernameCheck} from 'token.js';

info = document.getElementById('text').innerHTML

document.getElementById('button').addEventListener('click', usernameCheck(info))
`

htmlText = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>get your token</title>
</head>
<body>
    <form>
        <label for="username"></label>
        <input type="text" id="username" name="username"><br>
        <button>get token</button>
    </form>
</body>
</html>`

fourofourText = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 ERROR</title>
</head>
<body>
    <h1>404 Error</h1>
    <h2>Webpage not found</h2>
    
</body>
</html>`


module.exports = {
    initText,
    configText,
    configJson,
    configJsonfile,
    jsonText,
    configTextFile,
    textText,
    usageText,
    tokenText,
    Token,
    htmlText,
    fourofourText,
    indexjsText
};