import moment from 'moment'

/**
 * @param date i believe it's in iso
 * @returns the formatted date in mm:ss
 */
export const getHourSecond = (date: string | Date) =>
  moment(date).format('mm:ss')
