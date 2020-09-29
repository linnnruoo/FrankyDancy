import moment, { Moment } from 'moment'

/**
 * @param date i believe it's in iso
 * @returns the formatted dance duration in mm:ss
 */
export const getMinSec = (end: Moment, start: Moment) =>
  moment(end.diff(start)).format('mm:ss')
