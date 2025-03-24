import { parseISO, format } from 'date-fns'

export default function DateFormatter({ dateString }) {
  if (!dateString) return null
  
  try {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
  } catch (error) {
    console.error('Error formatting date:', dateString, error)
    return <time dateTime={dateString}>{dateString}</time>
  }
}
