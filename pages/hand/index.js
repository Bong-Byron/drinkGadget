const { sample, sampleMany } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateShort } = require("../../utils/vibration")

const actions = ["碰拳", "击掌", "手背叠放", "左右手交换", "一起比心", "同步拍桌三下"]

Page({
  data: {
    players: [],
    result: "",
    modalVisible: false
  },
  handlePlayers(event) {
    this.setData({ players: event.detail.names })
  },
  draw() {
    if (this.data.players.length < 2) {
      wx.showToast({ title: "至少输入 2 人", icon: "none" })
      return
    }
    const pair = sampleMany(this.data.players, 2)
    const action = sample(actions)
    recordGame("hand")
    vibrateShort()
    this.setData({
      result: `${pair[0]} 和 ${pair[1]}：${action}`,
      modalVisible: true
    })
  },
  closeModal() {
    this.setData({ modalVisible: false })
  }
})
