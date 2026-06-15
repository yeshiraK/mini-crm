export function getDateRangeFilter(dateRange: string): { start: Date; end: Date } {
  const end = new Date()
  const start = new Date()

  switch (dateRange) {
    case 'today':
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    case '7d':
      start.setDate(start.getDate() - 7)
      break
    case '30d':
      start.setDate(start.getDate() - 30)
      break
    case '1y':
      start.setFullYear(start.getFullYear() - 1)
      break
    default:
      start.setDate(start.getDate() - 7)
  }

  return { start, end }
}

export function isDateInRange(date: Date | string, start: Date, end: Date): boolean {
  const dateToCheck = typeof date === 'string' ? new Date(date) : date
  return dateToCheck >= start && dateToCheck <= end
}

export function filterByDateRange<T extends { createdAt?: string; sentAt?: string; date?: string }>(
  items: T[],
  dateRange: string,
  customStart?: Date,
  customEnd?: Date
): T[] {
  let filterStart: Date
  let filterEnd: Date

  if (dateRange === 'custom' && customStart && customEnd) {
    filterStart = customStart
    filterEnd = customEnd
  } else {
    const range = getDateRangeFilter(dateRange)
    filterStart = range.start
    filterEnd = range.end
  }

  return items.filter((item) => {
    const dateStr = item.createdAt || item.sentAt || item.date
    if (!dateStr) return true
    return isDateInRange(dateStr, filterStart, filterEnd)
  })
}
