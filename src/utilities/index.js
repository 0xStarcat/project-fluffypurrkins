export const pathify = string => {
  return string
    .toLowerCase()
    .replace(/[^A-Za-z0-9\s]/gi, '')
    .replace(/\s/gi, '-')
}
