/* eslint-env node */

const fs=require('fs');

function getDataFromPath (path, extension) {

	let dir = fs.readdirSync( path );

	
	const files = dir.filter( elm => elm.match(new RegExp(`.*.(${extension})`, 'ig'))); 
	var response= new Array();
	for (let file of files) {
		const fileSizeInBytes = fs.statSync(path+'/'+file).size.toString().padEnd(7," ");
		const { spawnSync  } = require('child_process');
		const timestamp = spawnSync('git', ['log', '--pretty=format:%cd', '-n 1', '--date=format:%Y-%m-%d_%H:%M:%S' ,'--', path+'/'+file]).stdout.toString() ;
		response.push("UPD "+timestamp+" "+fileSizeInBytes+path+"/"+file);
	}

	return response;

}
module.exports = getDataFromPath;
