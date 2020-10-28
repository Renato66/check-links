import * as core from '@actions/core'
import { checkLinks } from './check-links'

async function run(): Promise<void> {
  try {
    // const text: string = core.getInput('text')
    const mdFile =`
[![license](https://img.shields.io/22github/license/felipefialho/frontend-challenges111.svg)](/license)
[![license](https://img.shields.io/github/license/felipefialho/frontend-challenges.svg)](/license)
`
    const links = await checkLinks(mdFile)
    links.broken.forEach(elem => {
      console.log('Erro on', elem.name, elem.url, elem.status)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
