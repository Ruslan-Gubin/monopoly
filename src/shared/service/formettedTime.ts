
const formattedTime = ( options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat('ru', options)
}

const getHourMinStr = (time: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    minute: '2-digit',
    hour: '2-digit'
  }
  return formattedTime(options).format(new Date(time).getTime())
}

export const TimeServices = {
  getHourMinStr,
}