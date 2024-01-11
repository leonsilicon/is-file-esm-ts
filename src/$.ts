import fs from 'node:fs';
import path from 'node:path';
import findUp from 'find-up';

function isFileEsmHelper(filePath: string, pkg: any) {
	if (pkg === undefined) {
		throw new Error('package.json not found');
	}

	if (!path.isAbsolute(filePath)) throw new Error('Path must be absolute');
	const fileExtension = path.extname(filePath);
	const extensionMatch = /\.(c|m)?(j|t)sx?/.exec(path.extname(filePath));
	if (extensionMatch === null) {
		throw new Error(`Invalid file extension: ${fileExtension}`);
	}

	const extensionType = extensionMatch[1] as 'c' | 'm' | '';

	if (extensionType === 'c') return false;
	if (extensionType === 'm') return true;
	if (pkg.type === 'module') {
		return true;
	} else if (
		pkg.type === 'commonjs' ||
		pkg.type === undefined
	) {
		return false;
	} else {
		throw new Error(
			`Invalid package.json type: ${String(pkg.type)}`
		);
	}
}

export async function isFileEsm(filePath: string) {
	const pkg = JSON.parse(
		await fs.promises.readFile(
			(await findUp('package.json', { cwd: path.dirname(filePath) }))!,
			'utf8'
		)
	);
	return isFileEsmHelper(filePath, pkg);
}

export function isFileEsmSync(filePath: string) {
	const pkg = JSON.parse(
		fs.readFileSync(
			findUp.sync('package.json', { cwd: path.dirname(filePath) })!,
			'utf8'
		)
	);
	return isFileEsmHelper(filePath, pkg);
}
