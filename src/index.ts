import path from 'node:path'

import readPackageUp from 'read-pkg-up'

function isFileEsmHelper(filePath: string, pkg: any) {
	if (pkg === undefined) {
		throw new Error('package.json not found')
	}

	if (!path.isAbsolute(filePath)) throw new Error('Path must be absolute')
	const fileExtension = path.extname(filePath)
	const extensionMatch = /\.(c|m)?(j|t)sx?/.exec(path.extname(filePath))
	if (extensionMatch === null) {
		throw new Error(`Invalid file extension: ${fileExtension}`)
	}

	const extensionType = extensionMatch[1] as 'c' | 'm' | ''

	if (extensionType === 'c') return false
	if (extensionType === 'm') return true
	if (pkg.packageJson.type === 'module') {
		return true
	} else if (
		pkg.packageJson.type === 'commonjs' ||
		pkg.packageJson.type === undefined
	) {
		return false
	} else {
		throw new Error(
			`Invalid package.json type: ${String(pkg.packageJson.type)}`,
		)
	}
}

export async function isFileEsm(filePath: string) {
	const pkg = await readPackageUp({ cwd: path.dirname(filePath) })
	return isFileEsmHelper(filePath, pkg)
}

export function isFileEsmSync(filePath: string) {
	const pkg = readPackageUp.sync({ cwd: path.dirname(filePath) })
	return isFileEsmHelper(filePath, pkg)
}
