import { isToday, format, differenceInMinutes } from 'date-fns';

export function formatDate(timestamp) {
    const ts = new Date(timestamp);
    if (isToday(ts)) {
        const minutesAgo = differenceInMinutes(new Date(), ts);
        return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
    } else {
        return format(ts, 'MMM d, yyyy');
    }
}
