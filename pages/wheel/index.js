const { randomInt } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateShort, vibrateLong } = require("../../utils/vibration")
const { startWheelSpinSound, playWheelEndSound, stopWheelSpinSound } = require("../../utils/audio")

const wheelItems = [
  "\u5927\u5192\u9669",
  "\u4e0b\u5bb6\u559d\u5149",
  "\u559d\u4e00\u676f",
  "PASS",
  "\u771f\u5fc3\u8bdd",
  "\u627e\u4eba\u4eb2\u4e00\u4e0b",
  "\u559d\u4e24\u676f",
  "\u771f\u5fc3\u8bdd",
  "\u5927\u5bb6\u5e72\u676f",
  "\u8f6c\u4e00\u4e2a",
  "\u559d\u534a\u676f",
  "\u5927\u5192\u9669",
  "\u7ffb\u500d",
  "\u627e\u4eba\u5e72\u676f",
  "\u8eb2\u8fc7\u4e00\u8f6e",
  "\u4e0a\u5bb6\u559d\u5149"
]

const segmentAngle = 360 / wheelItems.length
const spinDuration = 4200

const normalizeAngle = (angle) => {
  const value = angle % 360
  return value < 0 ? value + 360 : value
}

const getPointedIndex = (rotation) => {
  const pointerAngle = 0
  const boardAngleAtPointer = normalizeAngle(pointerAngle - normalizeAngle(rotation))
  return Math.floor((boardAngleAtPointer + segmentAngle / 2) / segmentAngle) % wheelItems.length
}

Page({
  data: {
    title: "\u559d\u9152\u795e\u5668",
    hintText: "\u70b9\u51fb\u8f6e\u76d8\u9879\u76ee\u53ef\u7f16\u8f91",
    vipText: "VIP",
    adText: "Banner \u5e7f\u544a\u4f4d\u9884\u7559",
    wheelItems,
    rotation: 0,
    wheelStyle: "",
    result: "\u5927\u5192\u9669",
    spinning: false,
    editVisible: false,
    editIndex: -1,
    editValue: "",
    editTitle: "\u7f16\u8f91\u8f6e\u76d8\u9879\u76ee",
    editPlaceholder: "\u6700\u591a 6 \u4e2a\u5b57",
    cancelText: "\u53d6\u6d88",
    saveText: "\u4fdd\u5b58"
  },
  spin() {
    if (this.data.spinning) return

    const items = this.data.wheelItems
    const targetIndex = randomInt(0, items.length - 1)
    const extraTurns = randomInt(6, 8) * 360
    const targetCenterAngle = targetIndex * segmentAngle
    const currentBase = this.data.rotation
    const currentNormalized = normalizeAngle(currentBase)
    const targetNormalized = normalizeAngle(360 - targetCenterAngle)
    const delta = normalizeAngle(targetNormalized - currentNormalized)
    const rotation = currentBase + extraTurns + delta

    recordGame("wheel")
    vibrateShort()
    startWheelSpinSound(spinDuration)
    this.setData({
      spinning: true,
      rotation,
      result: "\u8f6c\u52a8\u4e2d",
      wheelStyle: `transform: rotate(${rotation}deg);`
    })

    setTimeout(() => {
      stopWheelSpinSound()
      const latestItems = this.data.wheelItems
      const finalIndex = getPointedIndex(rotation)
      this.setData({
        spinning: false,
        result: latestItems[finalIndex]
      })
      playWheelEndSound()
      vibrateLong()
    }, spinDuration)
  },
  openEdit(event) {
    if (this.data.spinning) return
    const index = Number(event.currentTarget.dataset.index)
    this.setData({
      editVisible: true,
      editIndex: index,
      editValue: this.data.wheelItems[index] || ""
    })
  },
  handleEditInput(event) {
    this.setData({
      editValue: event.detail.value.slice(0, 6)
    })
  },
  closeEdit() {
    this.setData({
      editVisible: false,
      editIndex: -1,
      editValue: ""
    })
  },
  saveEdit() {
    const value = this.data.editValue.trim()
    if (!value) {
      wx.showToast({ title: "\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a", icon: "none" })
      return
    }
    if (value.length > 6) {
      wx.showToast({ title: "\u6700\u591a 6 \u4e2a\u5b57", icon: "none" })
      return
    }
    const items = this.data.wheelItems.slice()
    items[this.data.editIndex] = value
    this.setData({
      wheelItems: items,
      result: this.data.editIndex === getPointedIndex(this.data.rotation) ? value : this.data.result,
      editVisible: false,
      editIndex: -1,
      editValue: ""
    })
  },
  noop() {},
  goBack() {
    stopWheelSpinSound()
    wx.reLaunch({ url: "/pages/home/index" })
  },
  onUnload() {
    stopWheelSpinSound()
  }
})
