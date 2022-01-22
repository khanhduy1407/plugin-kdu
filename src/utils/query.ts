import qs from 'querystring'

export interface KduQuery {
  kdu?: boolean
  src?: boolean
  type?: 'script' | 'template' | 'style' | 'custom'
  index?: number
  lang?: string
}

export function parseKduRequest(id: string) {
  const [filename, rawQuery] = id.split(`?`, 2)
  const query = qs.parse(rawQuery) as KduQuery
  if (query.kdu != null) {
    query.kdu = true
  }
  if (query.src != null) {
    query.src = true
  }
  if (query.index != null) {
    query.index = Number(query.index)
  }
  return {
    filename,
    query
  }
}
