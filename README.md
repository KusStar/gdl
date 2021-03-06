# GDL - GitHub Download

> Download any folder from GitHub Repo url.

[![asciicast](https://asciinema.org/a/7Ca0oKLDj5S9uhwVMOItTEcTl.svg)](https://asciinema.org/a/7Ca0oKLDj5S9uhwVMOItTEcTl)

## Usage

- Just use `npx` to execute

```sh
npx gdl https://github.com/KusStar/gdl ./gdl
```

- Or use it in your project, see [Install](#install)

## Install

```sh
npm i gdl
# or yarn add gdl
```

### Commonjs

```js
const { download, downloadWithCheck } = require('gdl')

downloadWithCheck('https://github.com/KusStar/gkd', './gdl')
```

### ES6

```js
import { download, downloadWithCheck } from 'gdl'

downloadWithCheck('https://github.com/KusStar/gdl', './gdl')
```

## Interfaces
  
```ts
// index.d.ts
/**
 * Directly download any valid GitHub tree url.
 * Example: https://github.com/KusStar/gdl/tree/master/{...}
 * @param url
 * @param targetDir
 */
export declare function download(url: string, targetDir?: string): Promise<void>;
export declare type Callback = (dir: string) => void | Promise<void>;
/**
 * The same as download above, but with two checking callbacks.
 * Will check if targetDir is exists,
 * if exists and not empty, will try to call existsCallback,
 *  defaults to remove targetDir and mkdir targetDir.
 * if not exists, will try to call notExistsCallback,
 *  defaults to mkdir targetDir.
 * @param url
 * @param targetDir
 * @param ifExistsCallback
 * @param ifNotExistsCallback
 */
export declare function downloadWithCheck(url: string, targetDir?: string, ifExistsCallback?: Callback, notExistsCallback?: Callback): Promise<void>;
export * from './github';
```

```ts
// github.d.ts
/**
 * basically from next.js/packages/create-next-app/helpers/examples
 * The MIT License (MIT), Copyright (c), 2021 Vercel Inc.
 *
 * Modified by KusStar
 * @reference https://github.com/vercel/next.js/blob/e8e4210f9fe416534c36ceb9d3ad82dd02906cc6/packages/create-next-app/helpers/examples.ts
 */
export declare type RepoInfo = {
    username: string;
    name: string;
    branch: string;
    filePath: string;
};
export declare function isUrlOk(url: string): Promise<boolean>;
export declare function getRepoInfo(url: URL): Promise<RepoInfo | undefined>;
export declare function hasRepo({ username, name, branch, filePath }: RepoInfo): Promise<boolean>;
export declare function downloadAndExtractRepo(root: string, { username, name, branch, filePath }: RepoInfo, caching?: boolean): Promise<void>;
export interface Links {
    self: string;
    git: string;
    html: string;
}
export interface ContentItem {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url?: any;
    type: string;
    _links: Links;
}
export declare function getRepoContents(url: string): Promise<ContentItem[]>;
```

## Thanks

- [create-next-app](https://github.com/vercel/next.js/tree/e8e4210f9fe416534c36ceb9d3ad82dd02906cc6/packages/create-next-app)
  basically, the logic of download and extract GitHub repo is copied from it.

- [packages.json - devDependencies](./package.json)

## License

- [MIT](./LICENSE)
