const tasks = require("../../constants/tasks")
const { sample, sampleMany } = require("../../utils/random")
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
  pair() {
    if (this.data.players.length < 2) {
      wx.showToast({ title: "至少输入 2 人", icon: "none" })
      return
    }
    const pair = sampleMany(this.data.players, 2)
    const task = sample(tasks)
    recordGame("pairing")
    vibrateShort()
    this.setData({
      result: `${pair[0]} × ${pair[1]}：${task}`,
      modalVisible: true
    })
  },
  closeModal() {
    this.setData({ modalVisible: false })
  }
})
