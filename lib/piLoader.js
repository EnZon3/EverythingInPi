const fs = require('fs');
const dec = require('dec-to-binary');
const fetch = require('node-fetch');



async function load(dig, edgeL) {
    let dirname = __dirname;
    let fileToGet = `https://EverythingInPiCDN.enzon3.repl.co/pi_${dig}.txt`;
    const boilerplateHTML = `<style>.b{height:${edgeL}px;width:${edgeL}px;float:left;background-color: #333;}.c{background-color:cyan;}.bl{background-color:blue;}</style>`;
    //get the fileToGet, convert it to binary, and then convert it to a string
    let file = await fetch(fileToGet);
    let fileArray = file.match(/.{500}/g);
    for (let i = 0; i < fileArray.length; i++) {
        fileArray[i] = dec.decimal(fileArray[i]);
        console.log(i);
    }
    let fileString = fileArray.join('');
    //console.log(fileString);
    //split the file into an array of lines
    //for every index in fileArray, use a regex to replace the char '0' with "<div>"
    for (let i = 0; i < fileArray.length; i++) {
        fileArray[i] = fileArray[i].replace(new RegExp('0', "g"), '<div class="b c"></div>');
        fileArray[i] = fileArray[i].replace(new RegExp('1', "g"), '<div class="b bl"></div>');
    }
    //join the array into a string
    let fileString2 = fileArray.join('');
    fileString2 = fileString2.replace(new RegExp('\n', "g"), '');
    //add the boilerplate html to the string
    fileString2 = `${boilerplateHTML}\n${fileString2}`;
    //return the string
    return fileString2;
}

module.exports = { load };