const { gameSections, bannerAdUnitId } = require("../../constants/config")

Page({
  data: {
    sections: gameSections,
    bannerAdUnitId,
    avatarText: "\u4eba",
    userName: "\u4eca\u665a\u8c01\u6765",
    modeText: "\u805a\u4f1a\u6a21\u5f0f ON",
    profileText: "\u6211\u7684",
    adText: "Banner \u5e7f\u544a\u4f4d\u9884\u7559"
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
