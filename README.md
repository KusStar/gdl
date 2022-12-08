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
import { Options } from 'got';

/**
 * basically from next.js/packages/create-next-app/helpers/examples
 * The MIT License (MIT), Copyright (c), 2021 Vercel Inc.
 *
 * Modified by KusStar
 * @reference https://github.com/vercel/next.js/blob/e8e4210f9fe416534c36ceb9d3ad82dd02906cc6/packages/create-next-app/helpers/examples.ts
 */

declare type RepoInfo = {
    username: string;
    name: string;
    branch: string;
    filePath: string;
};
declare function isUrlOk(url: string): Promise<boolean>;
declare function getRepoInfo(url: URL, gotOptions?: Options): Promise<RepoInfo | undefined>;
declare function hasRepo({ username, name, branch, filePath }: RepoInfo): Promise<boolean>;
declare function downloadAndExtractRepo(root: string, { username, name, branch, filePath }: RepoInfo, caching?: boolean): Promise<unknown>;
interface Links {
    self: string;
    git: string;
    html: string;
}
interface ContentItem {
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
declare function getRepoContents(url: string): Promise<ContentItem[]>;

/**
 * Directly download any valid GitHub tree url.
 * Example: https://github.com/KusStar/gdl/tree/master/{...}
 * @param url
 * @param targetDir
 */
declare function download(url: string, targetDir?: string): Promise<unknown>;
declare type Callback = (dir: string) => void | Promise<void>;
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
declare function downloadWithCheck(url: string, targetDir?: string, ifExistsCallback?: Callback, notExistsCallback?: Callback): Promise<void>;

export { Callback, ContentItem, Links, RepoInfo, download, downloadAndExtractRepo, downloadWithCheck, getRepoContents, getRepoInfo, hasRepo, isUrlOk };
```

## Thanks

- [create-next-app](https://github.com/vercel/next.js/tree/e8e4210f9fe416534c36ceb9d3ad82dd02906cc6/packages/create-next-app)
  basically, the logic of download and extract GitHub repo is copied from it.

- [packages.json - devDependencies](./package.json)

## License

- [MIT](./LICENSE)
