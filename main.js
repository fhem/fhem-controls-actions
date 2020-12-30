const fs=require('fs');
const core = require('@actions/core');
const getDataFromPath = require('./src/func');

var filename = core.getInput('filename');
var path=core.getInput('directory');
var extension=core.getInput('extension');
var filemode=core.getInput('writemode');



var update_commands = getDataFromPath(path, extension);

var file = fs.createWriteStream(filename,{ flags: filemode });
file.on('error', function(err) { Console.log(err) });
update_commands.forEach(value => file.write(`${value}\n`));
file.end();


