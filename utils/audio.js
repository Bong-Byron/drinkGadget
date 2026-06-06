const playLocalSound = (src) => {
  if (!src || !wx.createInnerAudioContext) return null
  const audio = wx.createInnerAudioContext()
  audio.src = src
  audio.play()
  return audio
}

module.exports = {
  playLocalSound
}
