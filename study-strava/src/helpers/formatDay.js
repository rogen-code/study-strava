function formatDay(dt) {
  if (!dt) return null
  const year = Number(dt.substring(0, 4))
  const month = Number(dt.substring(5, 7)) - 1
  const day = Number(dt.substring(8, 10))
  const hr = Number(dt.substring(11, 13))
  const min = Number(dt.substring(14, 16))
  const sec = Number(dt.substring(17, 19))
  return new Date(year, month, day, hr, min, sec)
}

export default formatDay
