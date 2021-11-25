import { getRepoContents, getRepoInfo, hasRepo, isUrlOk } from '../dist'

describe('GitHub APIs', () => {
  const url = 'https://github.com/KusStar/gdl'

  it('isUrlOk', async () => {
    const result = await isUrlOk(url)
    expect(result).toBe(true)
  })

  it('getRepoInfo', async () => {
    const result = await getRepoInfo(new URL(url))
    expect(result).toBeTruthy()
    if (result) {
      expect(result.name).toBe('gdl')
      expect(result.username).toBe('KusStar')
      expect(result.branch).toBe('main')
      expect(result.filePath).toBe('')
    }
  })

  it('hasRepo', async () => {
    const result = await hasRepo({
      username: 'KusStar',
      name: 'gdl',
      branch: 'main',
      filePath: ''
    })
    expect(result).toBeTruthy()
  })

  it('getRepoContents', async () => {
    const result = await getRepoContents(url)
    expect(result.length).toBeGreaterThan(0)
  })
})
