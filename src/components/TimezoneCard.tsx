import React from 'react';
import { type Timezone } from '../types';
import { formatTime, formatDate, getTimezoneOffset } from '../utils/timezone';
import './TimezoneCard.css';

interface TimezoneCardProps {
  timezone: Timezone;
  currentTime: Date;
  onRemove: (id: string) => void;
}

export const TimezoneCard: React.FC<TimezoneCardProps> = ({ timezone, currentTime, onRemove }) => {
  const time = formatTime(currentTime, timezone.value);
  const date = formatDate(currentTime, timezone.value);
  const offset = getTimezoneOffset(timezone.value);

  return (
    <div className="timezone-card">
      <div className="timezone-card-header">
        <h3 className="timezone-label">{timezone.label}</h3>
        <button 
          className="remove-btn"
          onClick={() => onRemove(timezone.id)}
          aria-label={`Remove ${timezone.label}`}
        >
          ×
        </button>
      </div>
      <div className="timezone-time">{time}</div>
      <div className="timezone-details">
        <span className="timezone-date">{date}</span>
        <span className="timezone-offset">{offset}</span>
      </div>
    </div>
  );
};
