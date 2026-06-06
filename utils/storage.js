const RECENT_KEY = "recent_games"
const COUNT_KEY = "game_counts"
const AD_KEY = "ad_counts"

const get = (key, fallback) => {
  try {
    const value = wx.getStorageSync(key)
    return value || fallback
  } catch (error) {
    return fallback
  }
}

const set = (key, value) => {
  try {
    wx.setStorageSync(key, value)
  } catch (error) {}
}

const recordGame = (gameId) => {
  const counts = get(COUNT_KEY, {})
  counts[gameId] = (counts[gameId] || 0) + 1
  set(COUNT_KEY, counts)

  const recent = get(RECENT_KEY, []).filter((id) => id !== gameId)
  recent.unshift(gameId)
  set(RECENT_KEY, recent.slice(0, 6))
}

const recordAd = (type) => {
  const counts = get(AD_KEY, {})
  counts[type] = (counts[type] || 0) + 1
  set(AD_KEY, counts)
}

const clearStats = () => {
  set(RECENT_KEY, [])
  set(COUNT_KEY, {})
  set(AD_KEY, {})
}

module.exports = {
  get,
  set,
  recordGame,
  recordAd,
  clearStats,
  RECENT_KEY,
  COUNT_KEY,
  AD_KEY
}
