import lastIndexOf from 'lodash-es/lastIndexOf'

export const serialize = (obj, prefix) => {
  const params = {}
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p
      const v = obj[p]
      Object.assign(params, v !== null && typeof v === 'object' ? serialize(v, k) : { [k]: v })
    }
  }
  return params
}

export const pluralize = (noun) => {
  if (lastIndexOf(noun, 'y') === noun.length - 1) {
    return noun.substring(0, noun.length - 1) + 'ies'
  }
  return `${noun}s`
}
