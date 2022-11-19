const fs = require('fs');
const path = require('path')
const eventEmitter = require('events')
const emitter = new eventEmitter();


const { configJsonfile } = require('./templates')

const myArgs = process.argv.slice(2);

function jsonApp () {

    switch(myArgs[1]){
        case '--set':
            if(DEBUG) console.log('Json text file wrote --set')
            writeJson();
            emitter.emit('start', 'json --set')
            break;
        case '--reset':
            if(DEBUG) console.log('Json text file reset --reset')
            resetJson();
            emitter.emit('start', 'json --reset')
            break;
        case '--show':
            if(DEBUG) console.log('Json text file shown --show')
            displayJson();
            emitter.emit('start', 'json --show')
            break;
        case 'help':
        case 'h':    
        default:
            emitter.emit('start', 'json help')
            if(DEBUG) console.log('configJsonapp - default');
            fs.readFile(path.join(__dirname, '../help', 'jsonhelp.txt'), (error, data) => {
                if(error) throw error;
                console.log(data.toString());
            });
            break;
    }
}

function displayJson() {
    if(DEBUG) console.log('json.displayJson()');
    fs.readFile(path.join(__dirname, "../text.json"), (error, data) => {
        if(error) throw error;         
        console.log(JSON.parse(data));
    });
}

function writeJson() {
    let match = false;
    fs.readFile(path.join(__dirname, "../text.json"), (error, data) => {
        if (error) throw error;
        if (DEBUG) console.log(JSON.parse(data))
        let cfg = JSON.parse(data)
        for(let key of Object.keys(cfg)) {
            if(key === myArgs[2]) {
                cfg[key] = myArgs[3]
                match = true;
            }
        }
        if(!match) {
            console.log(`invalid key: ${myArgs[2]}, try another.`)
        }
        if(DEBUG) console.log(cfg);;
        data = JSON.stringify(cfg, null, 2);
        fs.writeFile(path.join(__dirname, "../text.json"), data, (error) => {
            if(error) {
                throw error;
            } else {
                console.log('Json file overwrote')
            }
            
        })
    });
   
}

function resetJson() {
    if(DEBUG) console.log('jsonapp.resetJson()');
    let configdata = JSON.stringify(configJsonfile, null, 2);
    fs.writeFile(path.join(__dirname, '../text.json'), configdata, (error) => {
        if(error) {
            throw error 
        } else {
            console.log('Json file reset')
        }  
        
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
    jsonApp,
}
