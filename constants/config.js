const bannerAdUnitId = ""
const rewardAdUnitId = ""
const interstitialAdUnitId = ""

const gameList = [
  {
    id: "finger",
    icon: "☝",
    title: "指尖模式",
    desc: "多人按住屏幕，随机选中一位接受惩罚。",
    path: "/pages/finger/index"
  },
  {
    id: "wheel",
    icon: "◎",
    title: "幸运转盘",
    desc: "输入玩家昵称，转盘决定今晚的幸运儿。",
    path: "/pages/wheel/index"
  },
  {
    id: "bomb",
    icon: "●",
    title: "炸弹模式",
    desc: "随机倒计时，手机在谁手里谁中招。",
    path: "/pages/bomb/index"
  },
  {
    id: "truth",
    icon: "?",
    title: "真心话大冒险",
    desc: "本地题库，随时抽题，气氛马上升温。",
    path: "/pages/truth/index"
  },
  {
    id: "dice",
    icon: "□",
    title: "摇骰子",
    desc: "支持 1、2、5、6 颗骰子，适合各种酒桌规则。",
    path: "/pages/dice/index"
  },
  {
    id: "picker",
    icon: "★",
    title: "随机点人",
    desc: "名单里随机抽取一位，选择困难到此为止。",
    path: "/pages/picker/index"
  },
  {
    id: "hand",
    icon: "✋",
    title: "命运之手",
    desc: "随机两名玩家和互动动作，快速制造名场面。",
    path: "/pages/hand/index"
  },
  {
    id: "electric",
    icon: "↯",
    title: "电流传递",
    desc: "生成起点终点，动作传递失败就接受惩罚。",
    path: "/pages/electric/index"
  },
  {
    id: "stack",
    icon: "≡",
    title: "手掌叠叠乐",
    desc: "随机生成层级规则，手慢或站错的人喝一杯。",
    path: "/pages/stack/index"
  },
  {
    id: "pairing",
    icon: "∞",
    title: "随机配对",
    desc: "抽两个人完成社交任务，破冰非常快。",
    path: "/pages/pairing/index"
  }
]

module.exports = {
  bannerAdUnitId,
  rewardAdUnitId,
  interstitialAdUnitId,
  gameList
}
