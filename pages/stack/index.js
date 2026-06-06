const { randomInt, sample } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateShort } = require("../../utils/vibration")

const rules = ["最上层喝一杯", "最下层喝一杯", "第三层喝一杯", "男生喝一杯", "女生喝一杯", "最后放手的人喝一杯"]

Page({
  data: {
    playerCount: 6,
    result: "",
    modalVisible: false
  },
  handleInput(event) {
    const playerCount = Number(event.detail.value) || 2
    this.setData({ playerCount })
  },
  draw() {
    const count = Math.max(2, Math.min(20, this.data.playerCount))
    const layer = randomInt(1, count)
    const rule = sample(rules)
    recordGame("stack")
    vibrateShort()
    this.setData({
      playerCount: count,
      result: `${count} 人参与，第 ${layer} 层重点观察：${rule}`,
      modalVisible: true
    })
  },
  closeModal() {
    this.setData({ modalVisible: false })
  }
})
