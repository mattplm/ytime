const numberToDDHHMMSS = (value: number): string => {
  let hours      = Math.floor(value / 3600),
      days       = Math.floor(hours / 24),
      minutes    = Math.floor((value - (hours * 3600)) / 60),
      seconds    = Math.floor(value - (hours * 3600) - (minutes * 60)),
      ddhhmmss   = [],
      daysStr    = String(days),
      hoursStr   = String(hours),
      minutesStr = String(minutes),
      secondsStr = String(seconds)

  if (days) {
    ddhhmmss.push(daysStr + ':')
    hours -= days * 24
    if (hours < 10) { hoursStr = '0' + hours }
  }
  if (days || hours) {
    ddhhmmss.push(hoursStr)
    if (minutes < 10) {minutesStr = '0' + minutes}
  }
  ddhhmmss.push(minutesStr)
  if (seconds < 10) {secondsStr = '0' + seconds}
  ddhhmmss.push(secondsStr)
  return ddhhmmss.join(':')
}

class YTiExtension {
  public getVideoElement(): HTMLVideoElement | null {
    return document.querySelector('video')
  }

  public getTimeDisplayerElement(): any | null {
    return document.getElementsByClassName('ytp-time-duration')[0].firstChild
  }

  public updateTimeDisplayer(_: Event | null): YTiExtension {
    const displayer = this.getTimeDisplayerElement()
    const video = this.getVideoElement()
    let text = displayer.textContent.split('(')[0]
    const timeWithPlaybackRate = (duration: number, playbackRate: number): number => {
      return duration * (1 / playbackRate)
    }

    displayer.textContent = text
    if (video?.playbackRate || 1 !== 1) {
      const actualTime = timeWithPlaybackRate(video?.duration || 0, video?.playbackRate || 1)
      displayer.textContent = text + ' (x' + video?.playbackRate + ': ' + numberToDDHHMMSS(actualTime) + ')'
    }
    return this
  }

  public setEventListener() {
    const video = this.getVideoElement()
    video?.addEventListener('ratechange', ev => this.updateTimeDisplayer(ev))
  }
}

// FIXME: When loading the page for the first time, the label will be set for a
// split second then disappear. Try to find a way to run this after youtube
// resets the value
new YTiExtension().updateTimeDisplayer(null).setEventListener()
