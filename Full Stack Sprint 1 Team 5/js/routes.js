const fs = require('fs');


function homePage(path, res) {
    fs.readFile(path, function(error, data){
        if (error) {
            console.log(error)
            res.writeHead(404)
            res.write('Error File Not Found')
        } else {
            res.writeHead(200, {'Content-Type': 'text/html' })
            console.log('HTTP Status Code:', res.statusCode);
            console.log('Read Sucessful');
            res.write(data)
        }
        res.end()
    })
}

function fourofourPage(path, res)  {
    fs.readFile(path, function(error, data){
        if (error) {
            console.log(error)
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else {
         res.writeHead(404, {'Content-Type': 'text/html' });
         console.log('HTTP Status Code:', res.statusCode);
         console.log('Read Failed');
         res.write(data)
        }
         res.end()
    })
}

module.exports = {
    homePage,
    fourofourPage
}