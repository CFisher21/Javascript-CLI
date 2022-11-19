const fs = require('fs');
const path = require('path');
const { configTextFile } = require('./templates');
const eventEmitter = require('events');
const emitter = new eventEmitter();


const myArgs = process.argv.slice(2);

function textApp() {
    switch(myArgs[1]) {
        case '--show':
            if(DEBUG) console.log('text.js --show') 
            displayText();
            emitter.emit('start', 'text --show')
            break;
        case '--set':
            if(DEBUG) console.log('text.js --set')
            setText();
            emitter.emit('start', 'text --set')
            break;
        case '--reset':
            if(DEBUG) console.log('text.js --reset')
            resetText();
            emitter.emit('start', 'text --reset')
            break;
        case 'help':
        case 'h':
        default:
            emitter.emit('start', 'text help')
            if(DEBUG) console.log('text.js Default/Help')
            fs.readFile(path.join(__dirname, '../help', 'texthelp.txt'), (error, data) => {
                if(error) throw error;
                console.log(data.toString());
            });
            break;
    }
}

function resetText() {
    if(DEBUG) console.log('text.resetText()');
    let configdata = JSON.stringify(configTextFile, null, 2);
    fs.writeFile(path.join(__dirname, '../text.txt'), configdata, (error) => {
        if(error) throw error;   
        console.log('text file reset');
        
    });
}

function setText() {
    if(DEBUG) console.log('text.setText()');
    if(DEBUG) console.log(myArgs);
    let match = false;
    fs.readFile(path.join(__dirname, "../text.txt"), (error, data) => {
        if(error) throw error;         
        if(DEBUG) console.log(JSON.parse(data));
        let cfg = JSON.parse(data);
        let all = 'all'
        
            if(all === myArgs[2]) {
                cfg = myArgs[3];
                match = true;
            
        }
        if(!match) {
            console.log(`invalid key: ${myArgs[2]}, try another.`)
        }
        if(DEBUG) console.log(cfg);
        data = JSON.stringify(cfg, null, 2);
        fs.writeFile(path.join(__dirname, '../text.txt'), data, (error) => {
            if (error) {
                throw error;
            } else {
                console.log('Text file overwrote')
            }
        });
    });
}

function displayText() {
    fs.readFile(path.join(__dirname, "../text.txt"), (error, data) => {
        if(error) throw error;         
        console.log(JSON.parse(data));
    });
}

emitter.on('start', message => {
    console.log(message)
    let data = message;
    fs.appendFile('../eventlog.txt', data + '\n', (error) =>{
        if(error) throw error;  
    })
})


module.exports = {
    textApp
}