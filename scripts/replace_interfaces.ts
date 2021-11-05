import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

const DIST_DIR = path.join(__dirname, '../dist')

const README_PATH = path.join(__dirname, '../README.md')

const T = '```'

const gitCommit = () => {
  const out = execSync('git status')
  if (out.toString().includes('modified:   README.md')) {
    execSync('git add README.md')
    execSync('git commit -m "update: README.md#Interfaces"')
  }
}

const main = () => {
  const indexDts = path.join(DIST_DIR, 'index.d.ts')
  const githubDts = path.join(DIST_DIR, 'github.d.ts')
  const indexDtsContent = fs.readFileSync(indexDts, 'utf8')
  const githubDtsContent = fs.readFileSync(githubDts, 'utf8')
  const readmeContent = fs.readFileSync(README_PATH, 'utf8')

  const REGEX = /## Interfaces.*## Thanks/gms
  const replaced = readmeContent.replace(REGEX, `## Interfaces
  
${T}ts
// index.d.ts
${indexDtsContent}${T}

${T}ts
// github.d.ts
${githubDtsContent}${T}

## Thanks`)

  fs.writeFileSync(README_PATH, replaced, { encoding: 'utf8' })

  console.log(`gdl: Replaced README.md#Interfaces`)

  gitCommit()
}

main()