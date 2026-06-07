let audioContext = null
let partyTimer = null
let wheelTimers = []
let bombTimer = null
let diceTimers = []
let diceAudio = null

const getAudioContext = () => {
  if (audioContext) return audioContext
  try {
    if (wx.createWebAudioContext) {
      audioContext = wx.createWebAudioContext()
      return audioContext
    }
  } catch (error) {}
  return null
}

const tone = (frequency, duration, volume = 0.08, type = "sine", delay = 0) => {
  const context = getAudioContext()
  if (!context || !context.createOscillator || !context.createGain) {
    if (wx.vibrateShort) wx.vibrateShort({ type: "light" })
    return
  }

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const start = context.currentTime + delay
  const end = start + duration

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.001, end)

  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(start)
  oscillator.stop(end + 0.02)
}

const playTapSound = () => {
  tone(780, 0.055, 0.075, "triangle")
  tone(1240, 0.04, 0.05, "sine", 0.035)
}

const playStartSound = () => {
  tone(262, 0.08, 0.1, "triangle")
  tone(392, 0.08, 0.1, "triangle", 0.08)
  tone(523, 0.11, 0.12, "triangle", 0.16)
}

const playWinSound = () => {
  tone(660, 0.09, 0.12, "sine")
  tone(880, 0.1, 0.12, "sine", 0.09)
  tone(1320, 0.16, 0.11, "triangle", 0.18)
}

const startPartyLoop = () => {
  stopPartyLoop()
  playStartSound()
  let step = 0
  partyTimer = setInterval(() => {
    const beat = step % 4
    tone(beat === 0 ? 130 : 164, 0.06, 0.08, "square")
    if (beat === 1 || beat === 3) tone(760, 0.04, 0.06, "triangle", 0.05)
    if (beat === 2) tone(980, 0.05, 0.065, "sine", 0.08)
    step += 1
  }, 230)
}

const stopPartyLoop = () => {
  if (partyTimer) {
    clearInterval(partyTimer)
    partyTimer = null
  }
}

const startWheelSpinSound = (duration = 4200) => {
  stopWheelSpinSound()
  const beats = [90, 105, 120, 140, 165, 195, 235, 285, 350, 430, 520, 640, 780]
  let elapsed = 0
  beats.forEach((gap, index) => {
    elapsed += gap
    if (elapsed >= duration - 260) return
    const timer = setTimeout(() => {
      tone(index % 2 === 0 ? 280 : 360, 0.045, 0.09, "square")
      tone(720 + index * 18, 0.035, 0.055, "triangle", 0.025)
      if (wx.vibrateShort && index % 3 === 0) wx.vibrateShort({ type: "light" })
    }, elapsed)
    wheelTimers.push(timer)
  })
}

const playWheelEndSound = () => {
  tone(392, 0.08, 0.11, "triangle")
  tone(523, 0.1, 0.12, "triangle", 0.08)
  tone(784, 0.18, 0.13, "sine", 0.18)
}

const stopWheelSpinSound = () => {
  wheelTimers.forEach((timer) => clearTimeout(timer))
  wheelTimers = []
}

const startBombLoop = (getSeconds) => {
  stopBombLoop()
  let step = 0
  bombTimer = setInterval(() => {
    const seconds = typeof getSeconds === "function" ? getSeconds() : 10
    const urgent = seconds <= 5
    const critical = seconds <= 3
    const base = critical ? 150 : urgent ? 190 : 230
    tone(base, 0.075, critical ? 0.14 : urgent ? 0.12 : 0.1, "square")
    tone(critical ? 880 : urgent ? 720 : 560, 0.05, critical ? 0.1 : 0.075, "triangle", 0.07)
    if (step % 2 === 0) tone(110, 0.04, 0.08, "sine", 0.13)
    step += 1
  }, 360)
}

const stopBombLoop = () => {
  if (bombTimer) {
    clearInterval(bombTimer)
    bombTimer = null
  }
}

const playBombEndSound = () => {
  tone(92, 0.22, 0.18, "square")
  tone(58, 0.34, 0.2, "sawtooth", 0.08)
  tone(760, 0.08, 0.16, "triangle", 0.02)
  tone(1040, 0.12, 0.16, "sine", 0.16)
  tone(140, 0.18, 0.18, "square", 0.28)
}

const stopDiceShakeSound = () => {
  diceTimers.forEach((timer) => clearTimeout(timer))
  diceTimers = []
  if (diceAudio) {
    try {
      diceAudio.stop()
      diceAudio.destroy()
    } catch (error) {}
    diceAudio = null
  }
}

const playDiceShakeSound = (duration = 1800) => {
  stopDiceShakeSound()
  if (wx.createInnerAudioContext) {
    try {
      diceAudio = wx.createInnerAudioContext()
      diceAudio.src = "/assets/sounds/dice-shake.mp3"
      diceAudio.volume = 1
      diceAudio.obeyMuteSwitch = false
      diceAudio.play()
      const timer = setTimeout(() => stopDiceShakeSound(), duration)
      diceTimers.push(timer)
      return
    } catch (error) {
      diceAudio = null
    }
  }
  const gaps = [0, 48, 92, 138, 190, 245, 302, 360, 424, 492, 566, 642, 724, 812, 904, 1002, 1108, 1220, 1340, 1450]
  gaps.forEach((gap, index) => {
    if (gap > duration) return
    const timer = setTimeout(() => {
      const hit = index % 4
      tone(hit === 0 ? 74 : hit === 1 ? 92 : hit === 2 ? 118 : 86, 0.038, 0.2, "square")
      tone(hit === 0 ? 310 : hit === 1 ? 245 : hit === 2 ? 360 : 285, 0.026, 0.12, "sawtooth", 0.012)
      tone(52, 0.032, 0.11, "triangle", 0.024)
      if (wx.vibrateShort && index % 4 === 0) wx.vibrateShort({ type: "light" })
    }, gap)
    diceTimers.push(timer)
  })
}

const playDiceOpenSound = () => {
  tone(96, 0.09, 0.18, "square")
  tone(260, 0.06, 0.11, "sawtooth", 0.04)
  tone(520, 0.1, 0.12, "triangle", 0.11)
}

const playLocalSound = (src) => {
  if (!src || !wx.createInnerAudioContext) return null
  const audio = wx.createInnerAudioContext()
  audio.src = src
  audio.play()
  return audio
}

module.exports = {
  playLocalSound,
  playTapSound,
  playStartSound,
  playWinSound,
  startPartyLoop,
  stopPartyLoop,
  startWheelSpinSound,
  playWheelEndSound,
  stopWheelSpinSound,
  startBombLoop,
  stopBombLoop,
  playBombEndSound,
  playDiceShakeSound,
  playDiceOpenSound,
  stopDiceShakeSound
}
