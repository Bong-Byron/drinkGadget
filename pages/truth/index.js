const { truth, dare } = require("../../constants/questions")
const { sample } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateShort } = require("../../utils/vibration")

Page({
  data: {
    mode: "truth",
    question: "点击下一题开始",
    modes: [
      { key: "truth", text: "真心话" },
      { key: "dare", text: "大冒险" }
    ]
  },
  switchMode(event) {
    const mode = event.currentTarget.dataset.mode
    this.setData({ mode })
    this.nextQuestion(mode)
  },
  nextQuestion(mode = this.data.mode) {
    const list = mode === "truth" ? truth : dare
    recordGame("truth")
    vibrateShort()
    this.setData({ question: sample(list) })
  }
})
