const fs = require('fs');
const path = require('path');
const { configJson } = require('./templates')
const eventEmitter = require('events')
const emitter = new eventEmitter();

const myArgs = process.argv.slice(2);

function configApp() {
    const myArgs = process.argv.slice(2);
    //Use this line of code to send the 3rd and beyond args to the console 
    //if(myArgs.length > 1) console.log('the init.args: ', myArgs);
        switch (myArgs[1]) {
            case '--show':
                displayConfig();
                emitter.emit('start', 'config --show')
                if(DEBUG) console.log('configApp.Show() --show');
                break;
            case '--reset':
                resetConfig();
                emitter.emit('start', 'config --reset')
                if(DEBUG) console.log('configApp.Reset() --reset');
                break;
            case '--set':
                setConfig();
                emitter.emit('start', 'config --set')
                if(DEBUG) console.log('configApp.Set() --set');
                break;
            case 'help':
            case 'h':
            default:
                emitter.emit('start', 'config help')
                if(DEBUG) console.log('configApp - default');
                fs.readFile(path.join(__dirname, '../help', 'confighelp.txt'), (error, data) => {
                    if(error) throw error;
                    console.log(data.toString());
                });
                break;
        }
    }

function displayConfig() {
    if(DEBUG) console.log('config.displayConfig()');
    fs.readFile(path.join(__dirname, "../config.json"), (error, data) => {
        if(error) throw error;         
        console.log(JSON.parse(data));
    });
}

function resetConfig() {
    if(DEBUG) console.log('config.resetConfig()');
    let configdata = JSON.stringify(configJson, null, 2);
    fs.writeFile(path.join(__dirname,  '../config.json'), configdata, (error) => {
        if(error) {
            throw error;
        } else {
            console.log('Config file reset');
        }   
       
        
    });
}

function setConfig() {
    if(DEBUG) console.log('config.setConfig()');
    if(DEBUG) console.log(myArgs);
    let match = false;
    fs.readFile(path.join(__dirname, "../config.json"), (error, data) => {
        if(error) throw error;         
        if(DEBUG) console.log(JSON.parse(data));
        let cfg = JSON.parse(data);
        for(let key of Object.keys(cfg)){
            if(key === myArgs[2]) {
                cfg[key] = myArgs[3];
                match = true;
            }
        }
        if(!match) {
            console.log(`invalid key: ${myArgs[2]}, try another.`)
        }
        if(DEBUG) console.log(cfg);
        data = JSON.stringify(cfg, null, 2);
        fs.writeFile(path.join(__dirname, '../config.json'), data, (error) => {
            if (error) {
                throw error;
            } else {console.log('config file overwrote')}
            
        });
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
    configApp,
  }