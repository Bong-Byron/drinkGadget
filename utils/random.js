const randomInt = (min, max) => {
  const lower = Math.ceil(min)
  const upper = Math.floor(max)
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}

const sample = (list) => {
  if (!Array.isArray(list) || list.length === 0) return null
  return list[randomInt(0, list.length - 1)]
}

const shuffle = (list) => {
  const next = list.slice()
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i)
    const item = next[i]
    next[i] = next[j]
    next[j] = item
  }
  return next
}

const sampleMany = (list, count) => shuffle(list).slice(0, count)

const rollDice = (count) => {
  return Array.from({ length: count }, () => randomInt(1, 6))
}

module.exports = {
  randomInt,
  sample,
  shuffle,
  sampleMany,
  rollDice
}
