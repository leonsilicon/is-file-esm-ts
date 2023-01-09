import fs from 'node:fs'
import path from 'node:path'
import { after } from 'node:test'

import { join } from 'desm'
import { expect, test } from 'vitest'

import { isFileEsm, isFileEsmSync } from '~/index.js'

const fixturesDir = join(import.meta.url, '../fixtures')

test('path must be absolute', async () => {
	await expect(isFileEsm('../foo.js')).rejects.toThrow()
	await expect(isFileEsm('./bar/foo.mjs')).rejects.toThrow()
})

test('path must have ext (promise)', async () => {
	await expect(isFileEsm('/bar/foo')).rejects.toThrow()
})

test('path must have valid ext (promise)', async () => {
	await expect(isFileEsm('/bar/foo.ext')).rejects.toThrow()
})

test('type-commonjs-cjs promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-commonjs-cjs', 'file.cjs')
	expect(await isFileEsm(inputPath)).toBe(false)
})

test('type-commonjs-js promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-commonjs-js', 'file.js')
	expect(await isFileEsm(inputPath)).toBe(false)
})

test('type-commonjs-mjs promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-commonjs-mjs', 'file.mjs')
	expect(await isFileEsm(inputPath)).toBe(true)
})

test('type-module-cjs promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-module-cjs', 'file.cjs')
	expect(await isFileEsm(inputPath)).toBe(false)
})

test('type-module-js promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-module-js', 'file.js')
	expect(await isFileEsm(inputPath)).toBe(true)
})

test('type-module-mjs promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-module-mjs', 'file.mjs')
	expect(await isFileEsm(inputPath)).toBe(true)
})

test('type-undefined-cjs promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-undefined-cjs', 'file.cjs')
	expect(await isFileEsm(inputPath)).toBe(false)
})

test('type-undefined-js promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-undefined-js', 'file.js')
	expect(await isFileEsm(inputPath)).toBe(false)
})

test('type-undefined-mjs promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-undefined-mjs', 'file.mjs')
	expect(await isFileEsm(inputPath)).toBe(true)
})

test('type-bad-js promise', async () => {
	const inputPath = path.join(fixturesDir, 'type-bad-js', 'file.js')
	await expect(isFileEsm(inputPath)).rejects.toThrow()
})

test('type-commonjs-cjs sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-commonjs-cjs', 'file.cjs')
	expect(isFileEsmSync(inputPath)).toBe(false)
})

test('type-commonjs-js sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-commonjs-js', 'file.js')
	expect(isFileEsmSync(inputPath)).toBe(false)
})

test('type-commonjs-mjs sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-commonjs-mjs', 'file.mjs')
	expect(isFileEsmSync(inputPath)).toBe(true)
})

test('type-module-cjs sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-module-cjs', 'file.cjs')
	expect(isFileEsmSync(inputPath)).toBe(false)
})

test('type-module-js sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-module-js', 'file.js')
	expect(isFileEsmSync(inputPath)).toBe(true)
})

test('type-module-mjs sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-module-mjs', 'file.mjs')
	expect(isFileEsmSync(inputPath)).toBe(true)
})

test('type-undefined-cjs sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-undefined-cjs', 'file.cjs')
	expect(isFileEsmSync(inputPath)).toBe(false)
})

test('type-undefined-js sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-undefined-js', 'file.js')
	expect(isFileEsmSync(inputPath)).toBe(false)
})

test('type-undefined-mjs sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-undefined-mjs', 'file.mjs')
	expect(isFileEsmSync(inputPath)).toBe(true)
})

test('path must be absolute (sync)', async () => {
	expect(() => isFileEsmSync('../foo.js')).toThrow()
	expect(() => isFileEsmSync('./bar/foo.mjs')).toThrow()
})

test('path must have ext (sync)', async () => {
	expect(() => isFileEsmSync('/bar/foo')).toThrow()
})

test('path must have valid ext (sync)', async () => {
	expect(() => isFileEsmSync('/bar/foo.ext')).toThrow()
})

test('type-bad-js sync', async () => {
	const inputPath = path.join(fixturesDir, 'type-bad-js', 'file.js')
	expect(() => isFileEsmSync(inputPath)).toThrow()
})