const fs = require('fs');
const dec = require('dec-to-binary');
const fetch = require('node-fetch');



async function load(dig, edgeL) {
    let dirname = __dirname;
    let fileArray;
    let fileToGet = `https://res.cloudinary.com/enzon3/raw/upload/v1653507387/pi_${dig}.txt`;
    const boilerplateHTML = `<style>.b{height:${edgeL}px;width:${edgeL}px;float:left;background-color: #333;}.cy{background-color:cyan;}.bl{background-color:blue;}</style>`;
    //get the fileToGet, convert it to binary, and then convert it to a string
    let file = await fetch(fileToGet);
    console.log("File received");
    file = await file.text();
    console.log("File converted to string");
    if(dig == "32K") {
        fileArray = file.match(/.{500}/g);
        console.log("32K digi detected");
    } else {
        fileArray = file.match(/.{600}/g);
        console.log("127K digi detected");
    }
    if(dig == "32K") {
        for (let i = 0; i < fileArray.length; i++) {
            fileArray[i] = dec.decimal(fileArray[i]);
            console.log(i);
        }
    } else {
        for (let i = 0; i <= 212; i++) {
            fileArray[i] = dec.decimal(fileArray[i]);
            console.log(i);
        }
    }
    console.log("binary conversion done");
    //let fileString = fileArray.join('');
    //console.log(fileString);
    //split the file into an array of lines
    //for every index in fileArray, use a regex to replace the char '0' with "<div>"
    for (let i = 0; i < fileArray.length; i++) {
        fileArray[i] = fileArray[i].replace(new RegExp('0', "g"), '<div class="b cy"></div>');
        fileArray[i] = fileArray[i].replace(new RegExp('1', "g"), '<div class="b bl"></div>');
    }
    console.log("decoding complete");
    //join the array into a string
    let fileString2 = fileArray.join('');
    fileString2 = fileString2.replace(new RegExp('\n', "g"), '');
    //add the boilerplate html to the string
    fileString2 = `${boilerplateHTML}\n${fileString2}`;
    console.log("res string created");
    //return the string
    return fileString2;
}

module.exports = { load };