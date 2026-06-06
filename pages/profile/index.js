const { gameList } = require("../../constants/config")
const { get, clearStats, RECENT_KEY, COUNT_KEY, AD_KEY } = require("../../utils/storage")

Page({
  data: {
    recentNames: [],
    total: 0,
    adTotal: 0
  },
  onShow() {
    this.refresh()
  },
  refresh() {
    const recent = get(RECENT_KEY, [])
    const counts = get(COUNT_KEY, {})
    const adCounts = get(AD_KEY, {})
    const nameMap = gameList.reduce((map, item) => {
      map[item.id] = item.title
      return map
    }, {})
    const total = Object.keys(counts).reduce((sum, key) => sum + counts[key], 0)
    const adTotal = Object.keys(adCounts).reduce((sum, key) => sum + adCounts[key], 0)
    this.setData({
      recentNames: recent.map((id) => nameMap[id] || id),
      total,
      adTotal
    })
  },
  reset() {
    clearStats()
    this.refresh()
    wx.showToast({ title: "已清空", icon: "success" })
  }
})
