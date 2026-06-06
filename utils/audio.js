let audioContext = null
let partyTimer = null

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
  stopPartyLoop
}
