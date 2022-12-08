/**
 * basically from next.js/packages/create-next-app/helpers/examples
 * The MIT License (MIT), Copyright (c), 2021 Vercel Inc.
 *
 * Modified by KusStar
 * @reference https://github.com/vercel/next.js/blob/e8e4210f9fe416534c36ceb9d3ad82dd02906cc6/packages/create-next-app/helpers/examples.ts
 */

import got, { Options } from 'got'
import QuickLRU from 'quick-lru'
import tar from 'tar'

const storageAdapter = new QuickLRU({ maxSize: 100 }) as any

export type RepoInfo = {
  username: string
  name: string
  branch: string
  filePath: string
}

export async function isUrlOk(url: string): Promise<boolean> {
  const res = await got.head(url).catch((e) => e)
  return res.statusCode === 200
}

export async function getRepoInfo(
  url: URL,
  gotOptions?: Options
): Promise<RepoInfo | undefined> {
  const [, username, name, t, branch, ...file] = url.pathname.split('/')
  const filePath = file.join('/')

  // Support repos whose entire purpose is to be a NextJS example, e.g.
  // https://github.com/:username/:my-cool-nextjs-example-repo-name.
  if (t === undefined) {
    const infoResponse = await got(
      `https://api.github.com/repos/${username}/${name}`,
      gotOptions
    ) as any
    if (infoResponse.statusCode !== 200) {
      return
    }
    const info = JSON.parse(infoResponse.body)
    return { username, name, branch: info.default_branch, filePath }
  }

  if (username && name && branch && (t === 'tree')) {
    return { username, name, branch, filePath }
  }
}

export function hasRepo({
  username,
  name,
  branch,
  filePath
}: RepoInfo): Promise<boolean> {
  const contentsUrl = `https://api.github.com/repos/${username}/${name}/contents`
  const packagePath = `${filePath ? `/${filePath}` : ''}/package.json`

  return isUrlOk(contentsUrl + packagePath + `?ref=${branch}`)
}

export function downloadAndExtractRepo(
  root: string,
  { username, name, branch, filePath }: RepoInfo,
  caching = true
) {
  return new Promise((resolve, reject) => {
    got.stream(
      `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`,
      {
        cache: caching ? storageAdapter : undefined
      }
    ).pipe(tar.extract(
      { cwd: root, strip: filePath ? filePath.split('/').length + 1 : 1 },
      [`${name}-${branch}${filePath ? `/${filePath}` : ''}`]
    ))
      .on('error', reject)
      .on('finish', resolve)
      .on('close', resolve)
  })
}

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

export async function getRepoContents(url: string) {
  const info = await getRepoInfo(new URL(url))
  if (info) {
    const { username, name, filePath } = info
    const res: ContentItem[] = await got
      .get(`https://api.github.com/repos/${username}/${name}/contents/${filePath}`,
        {
          searchParams: {
            ref: info.branch
          }
        }
      )
      .json()
    return res
  } else {
    return []
  }
}
