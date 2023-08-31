import { numberToDDHHMMSS, timeWithPlaybackRate } from './utils'

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

    displayer.textContent = text
    console.debug(video?.playbackRate)
    console.debug('test')
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
