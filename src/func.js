import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function normalizeControlsPath (outputDirectory, fullPath) {
	let relativePath = path.relative(outputDirectory, path.resolve(fullPath));

	relativePath = relativePath.replace(/^(?:\.\.\/|\.\/)+/, '');

	if (relativePath === '' || relativePath === '.' || relativePath === '..') {
		relativePath = path.basename(fullPath);
	}

	return relativePath;
}

function getDataFromPath (searchPath, extension, outputFilename) {
	const outputDirectory = path.dirname(path.resolve(outputFilename || searchPath));
	const dir = fs.readdirSync(searchPath);

	extension = extension.replace(/[.]/g, '\\$&'); // Escape dots in extensions
	const filt = new RegExp('(' + extension + ')$', 'ig');
	const files = dir.filter(elm => elm.match(filt));
	const response = [];

	for (const file of files) {
		const fullPath = path.join(searchPath, file);
		const fileSizeInBytes = fs.statSync(fullPath).size.toString();
		const timestamp = spawnSync('git', ['log', '--pretty=format:%cd', '-n 1', '--date=format:%Y-%m-%d_%H:%M:%S', '--', fullPath]).stdout.toString();
		const relativePath = normalizeControlsPath(outputDirectory, fullPath);

		response.push('UPD ' + timestamp + ' ' + fileSizeInBytes + ' ' + relativePath);
	}

	return response;
}

export default getDataFromPath;
