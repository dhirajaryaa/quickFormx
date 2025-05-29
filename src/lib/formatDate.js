import { isToday, format, differenceInMinutes, differenceInHours } from 'date-fns';

export function formatDate(timestamp) {
  const ts = new Date(timestamp);

  if (isToday(ts)) {
    const now = new Date();
    const hours = differenceInHours(now, ts);
    
    if (hours >= 1) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    const minutes = differenceInMinutes(now, ts);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  return format(ts, 'MMM d, yyyy');
}
