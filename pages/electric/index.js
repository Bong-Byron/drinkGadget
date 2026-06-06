const { sampleMany } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateLong } = require("../../utils/vibration")

Page({
  data: {
    players: [],
    seconds: 3,
    running: false,
    result: "",
    modalVisible: false
  },
  timer: null,
  handlePlayers(event) {
    this.setData({ players: event.detail.names })
  },
  start() {
    if (this.data.players.length < 2) {
      wx.showToast({ title: "至少输入 2 人", icon: "none" })
      return
    }
    if (this.data.running) return
    const pair = sampleMany(this.data.players, 2)
    recordGame("electric")
    this.setData({
      seconds: 3,
      running: true,
      result: `${pair[0]} 发起电流，传到 ${pair[1]} 停止。失败的人接受惩罚。`,
      modalVisible: false
    })
    this.timer = setInterval(() => {
      const next = this.data.seconds - 1
      if (next <= 0) {
        this.stopTimer()
        vibrateLong()
        this.setData({ seconds: 0, running: false, modalVisible: true })
        return
      }
      this.setData({ seconds: next })
    }, 1000)
  },
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  closeModal() {
    this.setData({ modalVisible: false })
  },
  onUnload() {
    this.stopTimer()
  }
})
