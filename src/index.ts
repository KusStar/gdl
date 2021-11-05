import fs from 'fs'
import { downloadAndExtractRepo, getRepoInfo } from './github'
import ora from 'ora';
/**
 * Directly download any valid GitHub tree url.
 * Example: https://github.com/KusStar/gdl/tree/master/{...}
 * @param url 
 * @param targetDir 
 */
export async function download(url: string, targetDir = './') {
  const info = await getRepoInfo(new URL(url))
  if (info) {
    return (await downloadAndExtractRepo(targetDir, info))
  } else {
    throw new Error('Invalid URL, must be like https://github.com/KusStar/gdl/tree/master/{...}')
  }
}

export type Callback = (dir: string) => void | Promise<void>

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
export async function downloadWithCheck(
  url: string,
  targetDir = './',
  ifExistsCallback: Callback = (dir) => {
    fs.rmSync(dir, { recursive: true, force: true })
    console.log(`> GDL -> removed ${dir}`)
    fs.mkdirSync(dir)
    console.log(`> GDL -> mkdir ${dir}`)
  },
  notExistsCallback: Callback = (dir) => fs.mkdirSync(dir)
) {
  if (fs.existsSync(targetDir)) {
    await ifExistsCallback(targetDir)
  } else {
    await notExistsCallback(targetDir)
  }
  try {
    const spinner = ora(`GDL -> downloading ${url} to ${targetDir}`).start();
    await download(url, targetDir)
    spinner.succeed()
  } catch (e) {
    console.error(e)
  }
}

export * from './github'