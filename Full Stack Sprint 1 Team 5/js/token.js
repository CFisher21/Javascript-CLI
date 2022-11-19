const crc32 = require('crc/crc32');
const { Token, jsonText } = require('./templates')
const fs = require('fs');
const path = require('path');
var prompt = require('prompt');
const eventEmitter = require('events')
const emitter = new eventEmitter();


const myArgs = process.argv.slice(2);

function tokenApp() {
    
    switch(myArgs[1]){
        case '--show':
        case '--s':
            if(DEBUG) console.log('token.showToken() --show --s')
            showToken();
            emitter.emit('start', 'text --show')
            break;
        case '--reset':
        case '--r':
            if(DEBUG) console.log('token.resetToken() --reset --r')
            resetToken();
            emitter.emit('start', 'text --reset')
            console.log('token reset to default')
            break;
        case '--add':
        case '--a':
            if(DEBUG) console.log('token.addToken()')
            addToken();
            emitter.emit('start', 'text --add')
            break;
        case '--check':
        case '--c':
            checkToken(myArgs[2])
            emitter.emit('start', 'text --check')
            break;    
        case 'help':
        case 'h':
        default:
            if(DEBUG) console.log('token.default --help --h')
            fs.readFile(path.join(__dirname, '../help', 'tokenhelp.txt'), (error, data) => {
                if(error) throw error;
                console.log(data.toString());
            });
            break;
    }

}

function checkToken(args) {
    crc = crc32(args).toString(16)
    console.log('token: ', crc)
    return crc
}

function showToken() {
    if(DEBUG) console.log('token.showToken()');
    fs.readFile(path.join(__dirname, "../userdata.json"), (error, data) => {
        if(error) throw error;         
        console.log(JSON.parse(data));
    });
}

function resetToken() {
    if(DEBUG) console.log('token.resetToken()');
    let configdata = JSON.stringify(Token, null, 2);
    fs.writeFile(path.join(__dirname, '../userdata.json'), configdata, (error) => {
        if(error) {
            throw error;
        } else {
            console.log('token file reset');
        }   
    });
}

function addToken() {
    if(DEBUG) console.log('token.addToken()');
    if(DEBUG) console.log(myArgs);
    
    prompt.start()
    prompt.get(['username', 'email', 'phone'], function (error, result){
        if(error) throw error
        
        const username = result.username;
        const email = result.email;
        const phone = result.phone;

        let crc = crc32(username).toString(16);
        let now = new Date();
        let nowString = now.toLocaleString();
        let expires = addDays(now, 3);
        let expiresString = expires.toLocaleString();
        let newToken = {};

        newToken.created = nowString;
        newToken.username = username;
        newToken.email = email;
        newToken.phone = phone;
        newToken.token = crc;
        newToken.expires = expiresString;


        fs.readFile(path.join(__dirname, '../userdata.json'), (error, data) => {
            if(error) {
                throw error
            } else {
                console.log('userdata.json file read successfully')
            }
            data = JSON.parse(data)
            
            data.push(newToken)
            
            write = JSON.stringify(data, null,2)

            fs.writeFile(path.join(__dirname, '../userdata.json'), write, (error) => {
                if (error) {
                    throw error;
                } else {console.log('user data file updated')}
            });
        })
    }) 
    
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

emitter.on('start', message => {
    console.log(message)
    let data = message;
    fs.appendFile('../eventlog.txt', data + '\n', (error) =>{
        if(error) throw error;  
    })
})



module.exports = {
    tokenApp,
    checkToken
}