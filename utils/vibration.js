const vibrateShort = () => {
  if (wx.vibrateShort) {
    wx.vibrateShort({ type: "medium" })
  }
}

const vibrateLong = () => {
  if (wx.vibrateLong) {
    wx.vibrateLong()
  }
}

module.exports = {
  vibrateShort,
  vibrateLong
}
