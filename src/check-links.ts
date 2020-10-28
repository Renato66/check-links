import axios from 'axios'

type Links = {
  ok: Link[],
  broken: Link[]
}
type Link = {
  status: number,
  name: string,
  url: string
}

export async function checkLinks(text: string = ''): Promise<Links> {
  const myRegexpSingle = /\[([^\[\]]*)\]\((.*?)\)/
  const myRegexpGlobal = /\[([^\[\]]*)\]\((.*?)\)/g
  const linksArray = text.match(myRegexpGlobal)
  if (linksArray !== null) {
    const linksPromise = linksArray.map((elem): Promise<Link> => {
      const link = elem.match(myRegexpSingle)!
      const name = link[1]
      const url = link[2]
      return axios
        .head(url)
        .then((result) => {
          return {
            status: result.status,
            name,
            url
          }
        })
        .catch((error) => {
          return {
            status: error.response.status,
            name,
            url
          }
        })
    })
    const result = await Promise.all(linksPromise)
    return {
      ok: result.filter(elem => elem.status === 200),
      broken: result.filter(elem => elem.status !== 200)
    }
  }
  return {
    ok: [],
    broken: []
  }
}