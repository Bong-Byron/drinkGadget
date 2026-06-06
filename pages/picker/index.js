const { sample } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateShort } = require("../../utils/vibration")

Page({
  data: {
    players: [],
    result: "",
    modalVisible: false
  },
  handlePlayers(event) {
    this.setData({ players: event.detail.names })
  },
  pick() {
    if (this.data.players.length < 2) {
      wx.showToast({ title: "至少输入 2 人", icon: "none" })
      return
    }
    recordGame("picker")
    vibrateShort()
    this.setData({
      result: sample(this.data.players),
      modalVisible: true
    })
  },
  closeModal() {
    this.setData({ modalVisible: false })
  }
})
