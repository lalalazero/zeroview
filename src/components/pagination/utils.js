const unique = arr => {
  let object = {}
  arr.map(i => object[i] = true)
  return Object.keys(object).map(key => parseInt(key, 10))
}
export {
  unique
}
