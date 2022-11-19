const fs = require('fs');
const path = require('path');
const {configJson, configText, initText, configJsonfile, jsonText, textText, configTextFile, usageText, tokenText, Token, htmlText, fourofourText, indexjsText } = require('./templates')
const eventEmitter = require('events')
const emitter = new eventEmitter();

function initializeApp() {
const myArgs = process.argv.slice(2);

    switch (myArgs[1]) {
        case '--all':
            createFolders();
            createHtml();
            createInit();
            createConfig();
            createJsontxt();
            createText();
            createToken();
            createEventlog();
            emitter.emit('start', 'app fully initialized, init --all')
            if(DEBUG) console.log('initializeApp.All() --all');
            break;
        case '--mk':
            createFolders();
            emitter.emit('start', 'folder structure created, init --mk')
            if(DEBUG) console.log('initializeApp.createFolders() --mk');
            break;
        case '--cat':
            createConfig();
            emitter.emit('start', 'config file created, init --cat')
            if(DEBUG) console.log('initializeApp.createInit() --cat');
            break;
        case '--jsontxt':
            createJsontxt();
            emitter.emit('start', 'json file created, init --jsontxt')
            if(DEBUG) console.log('initializedApp.createJsontxt --jsontxt')
            break;
        case '--text':
            if(DEBUG) console.log('initializedApp.createText --text')
            emitter.emit('start', 'text file created, init --text')
            createText();
            break;
        case '--token':
        case '--t':
            if(DEBUG) console.log('initializedApp.createToken() --token --t')
            emitter.emit('start', 'token file created, init --token --t')
            createToken()
            break;
        case 'help':
        case 'h':
        default:
            if(DEBUG) console.log('initializeApp - default');
            emitter.emit('start', 'help file displayed, init help')
            fs.readFile(path.join(__dirname, '../help', 'inithelp.txt'), (error, data) => {
                if(error) throw error;
                console.log(data.toString());
            });
            break;
    }
}

function createEventlog() {
    if(!fs.existsSync(path.join(__dirname, '../eventlog.txt'))) {
        fs.writeFile(path.join(__dirname, '../eventlog.txt'), ' ', (err) => {
            if(err) throw err;
            if(DEBUG) console.log('Data written to eventlog.txt file');
        });
    }
}

function createHtml() {
    if(!fs.existsSync(path.join(__dirname, '../views', 'index.html'))) {
        fs.writeFile(path.join(__dirname, '../views', 'index.html'), htmlText, (err) => {
            if(err) throw err;
            if(DEBUG) console.log('Data written to index.html file');
        });
    }

    if(!fs.existsSync(path.join(__dirname, '../views', '404.html'))) {
        fs.writeFile(path.join(__dirname, '../views', '404.html'), fourofourText, (err) => {
            if(err) throw err;
            if(DEBUG) console.log('Data written to 404.html file');
        });
    }
}

function createToken() {
    try {
        let data = JSON.stringify(Token, null, 2);
        if(!fs.existsSync(path.join(__dirname, '../userdata.json'))) {
            fs.writeFile(path.join(__dirname, '../userdata.json'), data, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to token.json file');
            });
        } else {
            if(DEBUG) console.log('token.json file already exists');
        }
    } catch(err) {
        console.error(err);
    }
}

function createText() {
    try {
        let data = JSON.stringify(configTextFile, null, 2);
        if(!fs.existsSync(path.join(__dirname,  '../text.txt'))) {
            fs.writeFile(path.join(__dirname, '../text.txt'), data, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to text.txt file');
            });
        } else {
            if(DEBUG) console.log('text.txt file already exists');
        }
    } catch(err) {
        console.error(err);
    }
}

function createJsontxt() {
    try {
        let data = JSON.stringify(configJsonfile, null, 2);
        if(!fs.existsSync(path.join(__dirname, '../text.json'))) {
            fs.writeFile(path.join(__dirname, '../text.json'), data, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to text.json file');
            });
        } else {
            if(DEBUG) console.log('text.json file already exists');
        }
    } catch(err) {
        console.error(err);
    }
}

function createFolders() {

    if(!fs.existsSync(path.join(__dirname, '../views'))) {
        fs.mkdir(path.join(__dirname, '../views'), (error) => {
        if(error) throw (error);
        console.log("views folder created")
        }
    )} else {
        console.log('views folder already exists')
    }

    if(!fs.existsSync(path.join(__dirname, '../help'))) {
        fs.mkdir(path.join(__dirname, '../help'), (error) => {
        if(error) throw (error);
        console.log("help folder created")
        }
    )} else {
        console.log('help folder already exists')
    }

    if(!fs.existsSync(path.join(__dirname, '../js'))) {
        fs.mkdir(path.join(__dirname, '../js'), (error) => {
        if(error) throw (error);
        console.log("js folder created")
        }
    )} else {
        console.log('js folder already exists')
    }
}; 

function createConfig() {
    try {
        let data = JSON.stringify(configJson, null, 2);
        if(!fs.existsSync(path.join(__dirname, '../config.json'))) {
            fs.writeFile(path.join(__dirname,  '../config.json'), data, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to config.json file');
            });
        } else {
            if(DEBUG) console.log('config.json file already exists');
        }
    } catch(err) {
        console.error(err);
    }
}

function createInit() {

    if(!fs.existsSync(path.join(__dirname, '../help'))) {
        fs.mkdir(path.join(__dirname, '../help'), (error) => {
            if(error) {
                console.log(error)
            } else {
            console.log('help folder not found so we created one, please run the init command again')
        }})
    } else {

        if(!fs.existsSync(path.join(__dirname, '../help', 'usagehelp.txt'))) {
            fs.writeFile(path.join(__dirname,'../help', 'usagehelp.txt'), usageText, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to usuagehelp.txt file');
            });
        }

        if(!fs.existsSync(path.join(__dirname, '../help', 'confighelp.txt'))) {
            fs.writeFile(path.join(__dirname,'../help', 'confighelp.txt'), configText, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to confighelp.txt file');
            });
        }

        if(!fs.existsSync(path.join(__dirname, '../help', 'inithelp.txt'))) {
            fs.writeFile(path.join(__dirname,'../help', 'inithelp.txt'), initText, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to inithelp.txt file');
            });
        }

        if(!fs.existsSync(path.join(__dirname, '../help', 'jsonhelp.txt'))) {
            fs.writeFile(path.join(__dirname,'../help', 'jsonhelp.txt'), jsonText, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to jsonhelp.txt file');
            });
        }

        if(!fs.existsSync(path.join(__dirname, '../help', 'texthelp.txt'))) {
            fs.writeFile(path.join(__dirname,'../help', 'texthelp.txt'), textText, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to texthelp.txt file');
            });
        }

        if(!fs.existsSync(path.join(__dirname, '../help', 'tokenhelp.txt'))) {
            fs.writeFile(path.join(__dirname,'../help', 'tokenhelp.txt'), tokenText, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to tokenhelp.txt file');
            });
        }

        if(!fs.existsSync(path.join(__dirname, '../help', 'texthelp.txt'))) {
            fs.writeFile(path.join(__dirname,'../help', 'texthelp.txt'), textText, (err) => {
                if(err) throw err;
                if(DEBUG) console.log('Data written to texthelp.txt file');
            });
        }
}}

emitter.on('start', message => {
    console.log(message)
    let data = message;
    fs.appendFile('../eventlog.txt', data + '\n', (error) =>{
        if(error) throw error;  
    })
})

module.exports = {
    initializeApp
}
