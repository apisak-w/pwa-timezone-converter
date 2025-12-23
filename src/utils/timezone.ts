import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

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

export const formatTimeSlot = (date: Dayjs, use24Hour: boolean = true): string => {
  return use24Hour ? date.format('HH:mm') : date.format('h:mm A');
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
  
  for (let i = 0; i < hoursToShow; i++) {
    const slotTime = dayjs(baseTime).tz(timezone).add(startOffset + i, 'hour');
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
