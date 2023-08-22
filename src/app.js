function timeWithPlaybackRate(duration, playbackRate){
  return duration * (1 / playbackRate)
}

Number.prototype.toDDHHMMSS = function () {
  let hours   = Math.floor(this / 3600)
  let days    = Math.floor(hours / 24)
  let minutes = Math.floor((this - (hours * 3600)) / 60)
  let seconds = Math.floor(this - (hours * 3600) - (minutes * 60))

  let ddhhmmss = []
  if (days) {
    ddhhmmss.push(days + ':')
    hours -= days * 24
    if (hours < 10) { hours = '0' + hours }
  }
  if (days || hours) {
    ddhhmmss.push(hours)
    if (minutes < 10) {minutes = "0"+minutes}
  }
  ddhhmmss.push(minutes)
  if (seconds < 10) {seconds = "0"+seconds}
  ddhhmmss.push(seconds)
  return ddhhmmss.join(':')
}

class YoutubeHandler {
  getVideoElement() {
    return document.querySelector('video')
  }

  getTimeDisplayerElement() {
    return document.getElementsByClassName('ytp-time-duration')[0].firstChild
  }

  updateTimeDisplayer(_) {
    const displayer = this.getTimeDisplayerElement()
    let text = displayer.textContent.split('(')[0]
    displayer.textContent = text
    const video = this.getVideoElement()
    const playbackRate = video.playbackRate
    if (playbackRate !== 1) {
      const duration = video.duration
      const actualTime = timeWithPlaybackRate(duration, playbackRate)
      displayer.textContent = text + ' (x' + playbackRate + ' = ' + actualTime.toDDHHMMSS() + ')'
    }
    return this
  }

  setEventListener() {
    const video = this.getVideoElement()
    video.addEventListener('ratechange', ev => this.updateTimeDisplayer(ev))
  }
}

new YoutubeHandler()
  .updateTimeDisplayer()
  .setEventListener()
