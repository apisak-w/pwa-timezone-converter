import React, { useState, useEffect } from 'react';
import { TimezoneTable } from './components/TimezoneTable';
import { type Timezone, POPULAR_TIMEZONES } from './types';
import { getLocalTimezone } from './utils/timezone';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezones, setSelectedTimezones] = useState<Timezone[]>([]);
  const [availableTimezones] = useState<Timezone[]>(POPULAR_TIMEZONES);

  // Update time every minute (table shows hours, not seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Initialize with local timezone
  useEffect(() => {
    const localTz = getLocalTimezone();
    const localTimezone = POPULAR_TIMEZONES.find(tz => tz.value === localTz);
    
    if (localTimezone) {
      setSelectedTimezones([localTimezone]);
    } else {
      // Default to New York if local timezone not in popular list
      setSelectedTimezones([POPULAR_TIMEZONES[0]]);
    }
  }, []);

  const handleAddTimezone = (timezoneId: string) => {
    const timezone = availableTimezones.find(tz => tz.id === timezoneId);
    if (timezone && !selectedTimezones.find(tz => tz.id === timezoneId)) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    }
  };

  const handleRemoveTimezone = (timezoneId: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.id !== timezoneId));
  };

  const unselectedTimezones = availableTimezones.filter(
    tz => !selectedTimezones.find(selected => selected.id === tz.id)
  );

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🌍</span>
            Timezone Converter
          </h1>
          <p className="app-subtitle">Compare multiple timezones at once</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <TimezoneTable
            timezones={selectedTimezones}
            currentTime={currentTime}
            onRemoveTimezone={handleRemoveTimezone}
          />

          {unselectedTimezones.length > 0 && (
            <div className="add-timezone-section">
              <label htmlFor="timezone-select" className="add-timezone-label">
                Add a timezone
              </label>
              <select
                id="timezone-select"
                className="timezone-select"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddTimezone(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>Select a timezone...</option>
                {unselectedTimezones.map(tz => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Works offline • Install as PWA for best experience</p>
      </footer>
    </div>
  );
}

export default App;
