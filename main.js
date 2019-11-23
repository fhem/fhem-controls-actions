var  fs=require('fs');

var myArgs = process.argv.slice(2);
var filename=myArgs[0];
var path=myArgs[1];
var extension=myArgs[2];


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

var update_commands = getDataFromPath(path, extension);

var file = fs.createWriteStream(filename);
file.on('error', function(err) { Console.log(err) });
update_commands.forEach(value => file.write(`${value}\r\n`));
file.end();
