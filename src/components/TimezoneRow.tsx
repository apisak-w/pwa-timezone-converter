import React from 'react';
import type { Timezone } from '../types';
import type { TimeSlot } from '../utils/timezone';
import './TimezoneRow.css';

interface TimezoneRowProps {
  timezone: Timezone;
  timeSlots: TimeSlot[];
  onRemove: (id: string) => void;
}

export const TimezoneRow: React.FC<TimezoneRowProps> = ({ timezone, timeSlots, onRemove }) => {
  return (
    <div className="timezone-row">
      <div className="timezone-header">
        <div className="timezone-info">
          <span className="timezone-name">{timezone.label}</span>
        </div>
        <button
          className="timezone-remove-btn"
          onClick={() => onRemove(timezone.id)}
          aria-label={`Remove ${timezone.label}`}
        >
          ×
        </button>
      </div>
      <div className="timezone-slots">
        {timeSlots.map((slot, index) => {
          const showDateLabel = index === 0 || slot.date !== timeSlots[index - 1].date;

          return (
            <div
              key={index}
              className={`time-slot ${slot.isCurrentHour ? 'current-hour' : ''}`}
            >
              {showDateLabel && (
                <div className="date-label">{slot.dayLabel}</div>
              )}
              <div className="time-value">{slot.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
