const vibrateShort = () => {
  if (wx.vibrateShort) {
    wx.vibrateShort({ type: "medium" })
  }
}

const vibrateHeavy = () => {
  if (wx.vibrateShort) {
    wx.vibrateShort({ type: "heavy" })
  }
}

const vibrateLong = () => {
  if (wx.vibrateLong) {
    wx.vibrateLong()
  }
}

const vibrateFinish = () => {
  vibrateHeavy()
  setTimeout(() => vibrateLong(), 120)
  setTimeout(() => vibrateLong(), 620)
  setTimeout(() => vibrateHeavy(), 1120)
}

module.exports = {
  vibrateShort,
  vibrateHeavy,
  vibrateLong,
  vibrateFinish
}
