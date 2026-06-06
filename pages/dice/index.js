const { rollDice } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateShort } = require("../../utils/vibration")

Page({
  data: {
    counts: [1, 2, 5, 6],
    count: 2,
    dice: [1, 1],
    total: 2
  },
  setCount(event) {
    const count = Number(event.currentTarget.dataset.count)
    const dice = rollDice(count)
    this.setData({ count, dice, total: dice.reduce((sum, item) => sum + item, 0) })
  },
  shake() {
    const dice = rollDice(this.data.count)
    recordGame("dice")
    vibrateShort()
    this.setData({ dice, total: dice.reduce((sum, item) => sum + item, 0) })
  }
})
