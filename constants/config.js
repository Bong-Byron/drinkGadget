const bannerAdUnitId = ""
const rewardAdUnitId = ""
const interstitialAdUnitId = ""

const gameList = [
  {
    id: "finger",
    group: "玩心跳",
    iconPath: "/assets/icons/finger.svg",
    title: "指尖模式",
    desc: "多人按住屏幕，随机点中一位。",
    path: "/pages/finger/index"
  },
  {
    id: "wheel",
    group: "玩心跳",
    iconPath: "/assets/icons/wheel.svg",
    title: "轮盘模式",
    desc: "名字上盘，转到谁就谁来。",
    path: "/pages/wheel/index"
  },
  {
    id: "bomb",
    group: "玩心跳",
    iconPath: "/assets/icons/bomb.svg",
    title: "炸弹传递",
    desc: "倒计时随机结束，拿到的人中招。",
    path: "/pages/bomb/index"
  },
  {
    id: "truth",
    group: "玩心跳",
    iconPath: "/assets/icons/truth.svg",
    title: "真心话大冒险",
    desc: "抽题破冰，气氛别太冷。",
    path: "/pages/truth/index"
  },
  {
    id: "dice",
    group: "比技术",
    iconPath: "/assets/icons/dice.svg",
    title: "骰子模式",
    desc: "1、2、5、6 颗骰子随手摇。",
    path: "/pages/dice/index"
  },
  {
    id: "picker",
    group: "比技术",
    iconPath: "/assets/icons/picker.svg",
    title: "随机点人",
    desc: "选择困难时，让随机来决定。",
    path: "/pages/picker/index"
  },
  {
    id: "hand",
    group: "秀神器",
    iconPath: "/assets/icons/hand.svg",
    title: "命运之手",
    desc: "随机两个人，完成一个互动。",
    path: "/pages/hand/index"
  },
  {
    id: "electric",
    group: "秀神器",
    iconPath: "/assets/icons/electric.svg",
    title: "电流传递",
    desc: "起点到终点，动作别断电。",
    path: "/pages/electric/index"
  },
  {
    id: "stack",
    group: "找好玩",
    iconPath: "/assets/icons/stack.svg",
    title: "手掌叠叠乐",
    desc: "叠手规则随机生成。",
    path: "/pages/stack/index"
  },
  {
    id: "pairing",
    group: "找好玩",
    iconPath: "/assets/icons/pairing.svg",
    title: "随机配对",
    desc: "抽两个人，做一个小任务。",
    path: "/pages/pairing/index"
  }
]

const gameSections = ["玩心跳", "比技术", "秀神器", "找好玩"].map((title) => ({
  title,
  games: gameList.filter((game) => game.group === title)
}))

module.exports = {
  bannerAdUnitId,
  rewardAdUnitId,
  interstitialAdUnitId,
  gameList,
  gameSections
}
