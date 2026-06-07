const { randomInt } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateFinish, vibrateShort } = require("../../utils/vibration")
const { startBombLoop, stopBombLoop, playBombEndSound } = require("../../utils/audio")

Page({
  data: {
    seconds: 0,
    running: false,
    result: "",
    modalVisible: false,
    title: "\u70b8\u5f39\u6a21\u5f0f",
    subtitle: "\u7cfb\u7edf\u968f\u673a\u751f\u6210 5 \u5230 30 \u79d2\u5012\u8ba1\u65f6\uff0c\u624b\u673a\u4f20\u5230\u8c01\u624b\u91cc\u7206\u70b8\u8c01\u63a5\u53d7\u60e9\u7f5a\u3002",
    readyLabel: "\u51c6\u5907\u5f00\u59cb",
    runningLabel: "\u4f20\u4e0b\u53bb",
    startText: "\u70b9\u71c3\u70b8\u5f39",
    runningText: "\u5012\u8ba1\u65f6\u4e2d",
    modalTitle: "BOOM"
  },
  timer: null,
  start() {
    if (this.data.running) return
    const seconds = randomInt(5, 30)
    recordGame("bomb")
    vibrateShort()
    this.setData({ seconds, running: true, modalVisible: false })
    startBombLoop(() => this.data.seconds)
    this.timer = setInterval(() => {
      const next = this.data.seconds - 1
      if (next <= 0) {
        this.stopTimer()
        stopBombLoop()
        playBombEndSound()
        vibrateFinish()
        this.setData({
          seconds: 0,
          running: false,
          result: "\u70b8\u5f39\u7206\u4e86\uff0c\u62ff\u624b\u673a\u7684\u4eba\u559d\u4e00\u676f",
          modalVisible: true
        })
        return
      }
      if (next <= 5) vibrateShort()
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
    stopBombLoop()
  }
})
