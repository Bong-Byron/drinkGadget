const { gameList, bannerAdUnitId } = require("../../constants/config")

Page({
  data: {
    games: gameList,
    bannerAdUnitId
  },
  handleSelect(event) {
    const { path } = event.detail
    if (!path) return
    wx.navigateTo({ url: path })
  },
  goProfile() {
    wx.navigateTo({ url: "/pages/profile/index" })
  }
})
