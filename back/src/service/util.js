export const addBasePath = (obj, basePath) => {
  const o = {};
  for (const prop in obj) {
    o[prop] = basePath + obj[prop]
  }
  return o;
}
