import dayjs from 'dayjs'
import cut from 'dayjs/plugin/utc'

dayjs.extend(cut)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).format(format)
}