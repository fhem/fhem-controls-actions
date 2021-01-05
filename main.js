const fs=require('fs');
const core = require('@actions/core');
const getDataFromPath = require('./src/func');

var filename = core.getInput('filename');
var path=core.getInput('directory');
var extension=core.getInput('extension');
var filemode=core.getInput('writemode');

core.info('parsing r controls file entrys in path: ' + path);
var update_commands = getDataFromPath(path, extension);

core.info('Try to open file: ' + filename + ' with filemode ' + filemode);
var file = fs.createWriteStream(filename,{ flags: filemode });
file.on('error', function(err) { core.error(err); core.setFailed(); });
update_commands.forEach(value => file.write(`${value}\n`));
file.end();
core.info('controls file' + filename + ' written');

core.setOutput('controls_content',update_commands);