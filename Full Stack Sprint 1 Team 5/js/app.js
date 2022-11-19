/*************************
 * File Name: app.js
 * Purpose: The main routines to start the initialization app
 * 
 * Created Date: June 22nd 2022
 * 
 * Authors:
 * CF - Cody Fisher
 * SH - Scott Hartley
 * NG - Noah Gosse
 * CP - Curtis Porter
 * 
 * Revisions:
 * Date, Author, Description
 * June 22nd 2022, CF, Build the starting point to the app
 * June 23rd 2022, CF, Added json and text file ability to read and write.
 * June 27th 2022, CF, Got userdata able to save to a file
 * 
 *************************/

DEBUG = false;

const fs = require('fs');
const path = require('path')
const { initializeApp } = require('./init.js');
const { configApp } = require('./config');
const { jsonApp } = require('./jsonapp.js');
const { textApp } = require('./text.js');
const { tokenApp } = require('./token.js')

const myArgs = process.argv.slice(2);

switch (myArgs[0]) {
    case 'init':
    case 'i':
        if (DEBUG) console.log(myArgs[0]), '- app initialized.';
        initializeApp();
        break;
    case 'config':
    case 'c':
        if(DEBUG) console.log(myArgs[0], ' - configuration file displayed.');
        configApp();
        break;
    case 'token':
    case 't':
        if(DEBUG) console.log(myArgs[0], ' - token accessed.');
        tokenApp();
        break;
    case 'json':
    case 'j':
        if (DEBUG) console.log(myArgs[0], '- JSON accessed')
        jsonApp();
        break; 
    case 'text':
        if(DEBUG) console.log(myArgs[0], '- Text accessed')
        textApp();
        break;     
    case 'help':
    case 'h':
    default:
        fs.readFile(path.join(__dirname, '../help', "usagehelp.txt"), (error, data) =>{
            if(error) {throw error}
            console.log(data.toString());
        })

}
