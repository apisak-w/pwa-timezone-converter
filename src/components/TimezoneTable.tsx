import { useRef, useEffect } from 'react';
import type { Timezone } from '../types';
import { TimezoneRow } from './TimezoneRow';
import { generateTimeSlots } from '../utils/timezone';
import './TimezoneTable.css';

interface TimezoneTableProps {
  timezones: Timezone[];
  currentTime: Date;
  onRemoveTimezone: (id: string) => void;
}

export const TimezoneTable = ({
  timezones,
  currentTime,
  onRemoveTimezone
}: TimezoneTableProps) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const hasScrolledToCurrentRef = useRef(false);

  // Generate time slots for display (show 24 hours: 6 hours before current to 18 hours after)
  const hoursToShow = 24;
  const startOffset = -6;

  useEffect(() => {
    // Auto-scroll to current time on initial load
    if (tableRef.current && !hasScrolledToCurrentRef.current) {
      const currentSlot = tableRef.current.querySelector('.current-hour');
      if (currentSlot) {
        currentSlot.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        hasScrolledToCurrentRef.current = true;
      }
    }
  }, [timezones]);

  if (timezones.length === 0) {
    return (
      <div className="timezone-table-empty">
        <p>No timezones selected. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="timezone-table" ref={tableRef}>
      <div className="timezone-table-container">
        {timezones.map(timezone => {
          const timeSlots = generateTimeSlots(currentTime, timezone.value, hoursToShow, startOffset);
          return (
            <TimezoneRow
              key={timezone.id}
              timezone={timezone}
              timeSlots={timeSlots}
              onRemove={onRemoveTimezone}
            />
          );
        })}
      </div>
    </div>
  );
};
