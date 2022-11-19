const http = require('http')
const routes= require('./routes')
const port = 3000;
const EventEmitter = require('events');
const emitter = new EventEmitter();
const fs = require('fs');


const server = http.createServer((req, res) => {

    if(req.method === "POST") {
        let requestBody = ''
        req.on('data', (chunk) => {
            requestBody+=chunk;
        })
    

    req.on('end', () => {
        let params = new URLSearchParams(requestBody)
    if(req.url === '/getresults') {
            console.log('request posted')
            console.log(params.get('username'))
            res.end('got data')
        }
    })
}

      switch(req.url) {
        case "/":
            routes.homePage('../views/index.html', res)
            break;
        default:
            routes.fourofourPage('../views/404.html', res)
            break;
    }
})

server.listen(port, "localhost", () =>{
    console.log('server is running')
})

emitter.on('start', message => {
    console.log(message)
    let data = message;
    fs.appendFile('../eventlog.txt', data + '\n', (error) =>{
        if(error) throw error;  
    })
})