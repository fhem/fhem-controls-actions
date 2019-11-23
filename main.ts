var path = require('path'), fs=require('fs');

	


function getDataFromPath(path, extension) {
    let dir = fs.readdirSync( path );
    const files = dir.filter( elm => elm.match(new RegExp(`.*\.(${extension})`, 'ig')));
	var response= new Array();
	for (let file of files) {
		const fileSizeInBytes = fs.statSync(path+'/'+file).size.toString().padEnd(7," ");
		const { spawnSync  } = require('child_process');
		const timestamp = spawnSync('git', ['log', '--pretty=format:%cd', '-n 1', '--date=format:%Y-%m-%d\_%H:%M:%S' ,'--', path+'/'+file]).stdout.toString() ;
		response.push("UPD "+timestamp+" "+fileSizeInBytes+path+"/"+file);
	}

	return response;

}

let filename = 'rsl_controls.txt';


var update_commands = getDataFromPath("FHEM", ".pm");

var file = fs.createWriteStream(filename);
file.on('error', function(err) { Console.log(err) });
update_commands.forEach(value => file.write(`${value}\r\n`));
file.end();
