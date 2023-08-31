export function numberToDDHHMMSS(value: number): string {
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

export const timeWithPlaybackRate = (duration: number, playbackRate: number): number =>  duration * (1 / playbackRate)
