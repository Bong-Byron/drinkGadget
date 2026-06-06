const { randomInt } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateLong } = require("../../utils/vibration")

Page({
  data: {
    seconds: 0,
    running: false,
    result: "",
    modalVisible: false
  },
  timer: null,
  start() {
    if (this.data.running) return
    const seconds = randomInt(5, 30)
    recordGame("bomb")
    this.setData({ seconds, running: true, modalVisible: false })
    this.timer = setInterval(() => {
      const next = this.data.seconds - 1
      if (next <= 0) {
        this.stopTimer()
        vibrateLong()
        this.setData({
          seconds: 0,
          running: false,
          result: "炸弹爆了，拿手机的人喝一杯",
          modalVisible: true
        })
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
