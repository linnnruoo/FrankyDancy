/**
 * @param date i believe it's in iso
 * @returns the formatted dance duration in mm:ss
 */
export const getSecondDiff = (end: Date, start: Date) => {
  const diffInMiliSec = end.getTime() - start.getTime()
  const diffInSec = Math.floor(diffInMiliSec / 1000)
  return diffInSec
}

export const getMinuteSecondString = (end: Date, start: Date) => {
  const diffInSec = getSecondDiff(end, start)
  const minute = Math.floor(diffInSec / 60)
  const actualDiffInSec = diffInSec % 60
  if (actualDiffInSec > 9) {
    return `${minute}:${actualDiffInSec}`
  }
  return `${minute}:0${actualDiffInSec}`
}
