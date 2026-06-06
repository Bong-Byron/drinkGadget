const { randomInt, sample } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateShort } = require("../../utils/vibration")

Page({
  data: {
    players: [],
    rotation: 0,
    wheelStyle: "",
    result: "",
    modalVisible: false
  },
  handlePlayers(event) {
    this.setData({ players: event.detail.names })
  },
  spin() {
    if (this.data.players.length < 2) {
      wx.showToast({ title: "至少输入 2 人", icon: "none" })
      return
    }
    const result = sample(this.data.players)
    const rotation = this.data.rotation + randomInt(1080, 1800)
    recordGame("wheel")
    vibrateShort()
    this.setData({
      rotation,
      wheelStyle: `transform: rotate(${rotation}deg);`,
      result: `${result} 被转盘选中了`,
      modalVisible: false
    })
    setTimeout(() => {
      this.setData({ modalVisible: true })
    }, 650)
  },
  closeModal() {
    this.setData({ modalVisible: false })
  }
})
