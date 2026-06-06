const { sample } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateLong } = require("../../utils/vibration")

const colors = ["#00E5FF", "#FF00FF", "#8A2BE2", "#FFD166", "#06D6A0", "#F72585", "#4CC9F0", "#B5179E"]

Page({
  data: {
    touches: [],
    result: "",
    modalVisible: false
  },
  selectionTimer: null,
  handleTouch(event) {
    const touches = event.touches.slice(0, 8).map((touch, index) => ({
      id: touch.identifier,
      x: touch.clientX - 22,
      y: touch.clientY - 22,
      color: colors[index % colors.length],
      label: index + 1
    }))
    this.setData({ touches })
    if (touches.length >= 2 && !this.selectionTimer && !this.data.modalVisible) {
      this.selectionTimer = setTimeout(() => {
        this.selectionTimer = null
        this.drawResult()
      }, 900)
    }
  },
  clearTouches() {
    if (this.selectionTimer) {
      clearTimeout(this.selectionTimer)
      this.selectionTimer = null
    }
    this.setData({ touches: [] })
  },
  drawResult() {
    if (this.data.touches.length < 2) {
      wx.showToast({ title: "至少 2 人按住", icon: "none" })
      return
    }
    const winner = sample(this.data.touches)
    recordGame("finger")
    vibrateLong()
    this.setData({
      result: `第 ${winner.label} 位玩家，该你喝了`,
      modalVisible: true
    })
  },
  closeModal() {
    this.setData({ modalVisible: false })
  },
  onUnload() {
    if (this.selectionTimer) {
      clearTimeout(this.selectionTimer)
      this.selectionTimer = null
    }
  }
})
