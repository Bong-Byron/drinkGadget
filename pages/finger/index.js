const { sample } = require("../../utils/random")
const { recordGame } = require("../../utils/storage")
const { vibrateLong, vibrateShort } = require("../../utils/vibration")
const { playTapSound, playWinSound, startPartyLoop, stopPartyLoop } = require("../../utils/audio")

const colors = ["#13F15B", "#2EEBFF", "#FF6DAE", "#FFD166", "#9B7CFF", "#6EF6C5", "#FF8A3D", "#F8F7FF"]
const markerDots = Array.from({ length: 18 }, (_, index) => index)
const punishmentCards = [
  {
    id: "redpacket",
    color: "#ff6f78",
    title: "\u53d1\u7ea2\u5305",
    icon: "\u00a5",
    action: "\u53d1\u4e2a\u53e3\u4ee4\u7ea2\u5305"
  },
  {
    id: "drink",
    color: "#7ea0ff",
    title: "\u559d\u9152",
    icon: "\u2661",
    action: "\u5e72\u4e00\u5c0f\u676f"
  },
  {
    id: "truth",
    color: "#f1f09b",
    title: "\u771f\u5fc3\u8bdd",
    icon: "...",
    action: "\u771f\u8bdd\u5fc5\u7b54"
  },
  {
    id: "dare",
    color: "#df95df",
    title: "\u5927\u5192\u9669",
    icon: "!",
    action: "\u73b0\u573a\u8868\u6f14"
  }
]

const punishmentPools = {
  redpacket: [
    "\u53d1 6.66 \u5143\u7ed9\u73b0\u573a\u6700\u4f1a\u6574\u6d3b\u7684\u4eba",
    "\u53d1 8.88 \u5143\u7ed9\u4eca\u665a\u6700\u5f00\u5fc3\u7684\u4eba",
    "\u53d1 7.77 \u5143\u7ea2\u5305\uff0c\u53e3\u4ee4\u662f\u201c\u6211\u4eca\u665a\u6700\u5e05\u201d",
    "\u53d1 5.20 \u5143\u7ed9\u521a\u521a\u7b11\u5f97\u6700\u5927\u58f0\u7684\u4eba"
  ],
  drink: [
    "\u548c\u5de6\u624b\u8fb9\u7684\u4eba\u78b0\u676f\uff0c\u559d\u4e00\u5c0f\u53e3",
    "\u9009\u4e00\u4e2a\u4eba\u966a\u4f60\u559d\u4e00\u676f",
    "\u8bf4\u4e00\u53e5\u795d\u9152\u8bcd\uff0c\u7136\u540e\u559d\u4e00\u5c0f\u676f",
    "\u548c\u73b0\u573a\u6700\u719f\u7684\u4eba\u5e72\u676f"
  ],
  truth: [
    "\u73b0\u573a\u8c01\u6700\u50cf\u4f60\u7684\u7406\u60f3\u578b\uff1f",
    "\u6700\u8fd1\u4e00\u6b21\u5fc3\u52a8\u662f\u4ec0\u4e48\u65f6\u5019\uff1f",
    "\u8bf4\u4e00\u4ef6\u4f60\u6700\u793e\u6b7b\u7684\u4e8b",
    "\u4f60\u4eca\u665a\u6700\u60f3\u548c\u8c01\u6362\u5ea7\u4f4d\uff1f"
  ],
  dare: [
    "\u5bf9\u4efb\u610f\u4e00\u4eba\u7528\u5938\u5f20\u8bed\u6c14\u5938 10 \u79d2",
    "\u6a21\u4eff\u4e00\u4e2a\u670b\u53cb\u7684\u7ecf\u5178\u52a8\u4f5c",
    "\u6446\u4e00\u4e2a\u6700\u50cf\u660e\u661f\u7684\u62cd\u7167\u59ff\u52bf",
    "\u7528\u6492\u5a07\u8bed\u6c14\u8bf4\u201c\u6211\u771f\u7684\u4e0d\u80fd\u518d\u559d\u4e86\u201d"
  ]
}

Page({
  data: {
    touches: [],
    phase: "idle",
    selectedId: null,
    resultText: "",
    showGuide: false,
    guideTitle: "\u6e38\u620f\u8bf4\u660e",
    guideLines: [
      "\u8bf7 2-8 \u4f4d\u73a9\u5bb6\u540c\u65f6\u6309\u4f4f\u5c4f\u5e55\u7a7a\u767d\u5904\u3002",
      "\u6309\u4f4f\u540e\u70b9\u51fb\u4e2d\u95f4\u6309\u94ae\uff0c\u7cfb\u7edf\u4f1a\u5f00\u59cb\u968f\u673a\u95ea\u70c1\u3002",
      "\u6700\u540e\u505c\u5728\u54ea\u4e2a\u624b\u6307\u4e0a\uff0c\u8c01\u5c31\u63a5\u53d7\u60e9\u7f5a\u3002"
    ],
    helpText: "\u8bf4\u660e",
    guideCloseText: "\u77e5\u9053\u4e86",
    penaltyTitle: "\u8bf7\u5e78\u8fd0\u73a9\u5bb6\u62bd\u724c\u9009\u62e9\u60e9\u7f5a",
    againText: "\u518d\u6218\u4e00\u5c40",
    changeText: "\u6362\u4e00\u4e2a",
    feedbackText: "\u6709\u597d\u7684\u60e9\u7f5a\u9898\u76ee\uff0c\u4e0b\u6b21\u5c31\u628a\u5b83\u52a0\u8fdb\u6765",
    punishmentCards,
    selectedPunishment: null
  },
  candidates: [],
  selectTimer: null,
  finishTimer: null,
  resultLocked: false,
  updateTouches(rawTouches) {
    const touches = rawTouches.slice(0, 8).map((touch, index) => ({
      id: touch.identifier,
      x: touch.clientX - 55,
      y: touch.clientY - 55,
      color: colors[index % colors.length],
      label: index + 1,
      delay: `${(index % 4) * 90}ms`,
      dots: markerDots
    }))

    this.setData({
      touches,
      phase: touches.length >= 2 ? "ready" : "idle",
      selectedId: null,
      resultText: ""
    })
  },
  handleTouchStart(event) {
    if (this.data.phase === "running" || this.resultLocked) return
    playTapSound()
    vibrateShort()
    this.updateTouches(event.touches)
  },
  handleTouchMove(event) {
    if (this.data.phase === "running" || this.resultLocked) return
    this.updateTouches(event.touches)
  },
  handleTouchEnd(event) {
    if (this.resultLocked) {
      if (event.touches.length === 0) {
        this.resultLocked = false
        this.showPenaltyPage()
      }
      return
    }
    if (this.data.phase === "running") return
    this.updateTouches(event.touches)
  },
  startPick() {
    if (this.data.phase === "running") return
    if (this.resultLocked || this.data.phase === "done") {
      wx.showToast({ title: "\u8bf7\u5148\u677e\u5f00\u624b\u6307", icon: "none" })
      return
    }
    if (this.data.touches.length < 2) {
      wx.showToast({ title: "\u81f3\u5c11 2 \u4eba\u6309\u4f4f", icon: "none" })
      return
    }

    this.candidates = this.data.touches.slice()
    let index = 0
    recordGame("finger")
    startPartyLoop()
    this.setData({
      phase: "running",
      selectedId: this.candidates[0].id,
      resultText: ""
    })

    this.selectTimer = setInterval(() => {
      index = (index + 1) % this.candidates.length
      this.setData({ selectedId: this.candidates[index].id })
    }, 120)

    this.finishTimer = setTimeout(() => {
      this.finishPick(sample(this.candidates))
    }, 2600)
  },
  startPickByTouch() {
    this.startPick()
  },
  finishPick(winner) {
    this.clearTimers()
    stopPartyLoop()
    playWinSound()
    vibrateLong()
    this.resultLocked = true
    this.setData({
      phase: "done",
      selectedId: winner.id,
      resultText: ""
    })
  },
  showPenaltyPage() {
    this.clearTimers()
    stopPartyLoop()
    this.candidates = []
    this.setData({
      touches: [],
      phase: "penalty",
      selectedId: null,
      resultText: ""
    })
  },
  selectPunishment(event) {
    const id = event.currentTarget.dataset.id
    this.openPunishment(id)
  },
  openPunishment(id) {
    const card = punishmentCards.find((item) => item.id === id)
    const content = sample(punishmentPools[id] || [])
    if (!card || !content) return
    this.setData({
      selectedPunishment: {
        id: card.id,
        title: card.title,
        color: card.color,
        action: card.action,
        content
      }
    })
  },
  changePunishment() {
    if (!this.data.selectedPunishment) return
    this.openPunishment(this.data.selectedPunishment.id)
  },
  closePunishment() {
    this.setData({ selectedPunishment: null })
  },
  resetPick() {
    this.clearTimers()
    stopPartyLoop()
    this.candidates = []
    this.resultLocked = false
    this.setData({
      touches: [],
      phase: "idle",
      selectedId: null,
      resultText: "",
      selectedPunishment: null
    })
  },
  toggleGuide() {
    this.setData({ showGuide: !this.data.showGuide })
  },
  noop() {},
  goBack() {
    wx.navigateBack({
      fail() {
        wx.redirectTo({ url: "/pages/home/index" })
      }
    })
  },
  clearTimers() {
    if (this.selectTimer) {
      clearInterval(this.selectTimer)
      this.selectTimer = null
    }
    if (this.finishTimer) {
      clearTimeout(this.finishTimer)
      this.finishTimer = null
    }
  },
  onUnload() {
    this.clearTimers()
    stopPartyLoop()
  }
})
