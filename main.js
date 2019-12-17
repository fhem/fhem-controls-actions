const fs=require('fs');
const core = require('@actions/core');

var filename = core.getInput('filename');
var path=core.getInput('directory');
var extension=core.getInput('extension');
var filemode=core.getInput('writemode');


function getDataFromPath(path, extension) {
    let dir = fs.readdirSync( path );
    const files = dir.filter( elm => elm.match(new RegExp(`.*\.(${extension})`, 'ig')));
	var response= new Array();
	for (let file of files) {
		const fileSizeInBytes = fs.statSync(path+'/'+file).size.toString().padEnd(7," ");
		const { spawnSync  } = require('child_process');
		var timestamp = spawnSync('git', ['log', '--pretty=format:%ad', '-n 1', '--date=format:%Y-%m-%d\_%H:%M:%S' ,'--', path+'/'+file]).stdout.toString() ;
		response.push("UPD "+timestamp+" "+fileSizeInBytes+path+"/"+file);
	}

	return response;

}

var update_commands = getDataFromPath(path, extension);

var file = fs.createWriteStream(filename,{ flags: filemode });
file.on('error', function(err) { Console.log(err) });
update_commands.forEach(value => file.write(`${value}\n`));
file.end();
