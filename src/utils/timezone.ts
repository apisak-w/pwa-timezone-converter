import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { POPULAR_TIMEZONES } from '../types';

export { POPULAR_TIMEZONES };

dayjs.extend(utc);
dayjs.extend(timezone);

export interface TimeSlot {
  hour: number;
  time: string;
  date: string;
  dayLabel: string;
  isCurrentHour: boolean;
  timestamp: number;
}

export const formatTime = (date: Date, tz: string): string => {
  return dayjs(date).tz(tz).format('HH:mm:ss');
};

export const formatDate = (date: Date, tz: string): string => {
  return dayjs(date).tz(tz).format('ddd, MMM D, YYYY');
};

export const getTimezoneOffset = (tz: string): string => {
  const offset = dayjs().tz(tz).format('Z');
  return `UTC${offset}`;
};

export const getLocalTimezone = (): string => {
  return dayjs.tz.guess();
};

export const formatTimeSlot = (date: Dayjs): string => {
  // Always show HH:mm format (e.g., "21:00", "14:30")
  return date.format('HH:mm');
};

export const formatDayLabel = (date: Dayjs): string => {
  return date.format('ddd DD');
};

export const generateTimeSlots = (
  baseTime: Date,
  timezone: string,
  hoursToShow: number = 24,
  startOffset: number = -6
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const now = dayjs().tz(timezone);
  const currentHour = now.hour();
  
  // Start from the beginning of the current hour
  const baseHour = dayjs(baseTime).tz(timezone).startOf('hour');
  
  for (let i = 0; i < hoursToShow; i++) {
    const slotTime = baseHour.add(startOffset + i, 'hour');
    const hour = slotTime.hour();
    
    slots.push({
      hour,
      time: formatTimeSlot(slotTime),
      date: slotTime.format('YYYY-MM-DD'),
      dayLabel: formatDayLabel(slotTime),
      isCurrentHour: hour === currentHour && slotTime.format('YYYY-MM-DD') === now.format('YYYY-MM-DD'),
      timestamp: slotTime.valueOf()
    });
  }
  
  return slots;
};

export const getTimezoneOffsetHours = (tz: string): number => {
  const offset = dayjs().tz(tz).utcOffset();
  return offset / 60;
};

export const getAllTimezones = (): { label: string; value: string }[] => {
  // @ts-ignore
  const timezones = Intl.supportedValuesOf('timeZone');
  return timezones.map((tz: string) => {
    const offset = dayjs().tz(tz).format('Z');
    const label = `${tz.replace(/_/g, ' ')} (UTC${offset})`;
    return { label, value: tz };
  });
};
