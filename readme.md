# is-file-esm-ts

Checks if a file will be executed in an ESM environment by Node.js.

## Usage

First, install `is-file-esm-ts` from your favorite package manager:

```
npm install is-file-esm-ts
```

Then, import it and use it in your project:

```
import { isFileEsm, isFileEsmSync } from 'is-file-esm-ts'

console.log(await isFileEsm('/absolute/path/to/file'))
console.log(isFileEsmSync('/absolute/path/to/file'))
```

