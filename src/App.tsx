import { useState, useEffect } from 'react';
import { TimezoneTable } from './components/TimezoneTable';
import { TimezoneSearch } from './components/TimezoneSearch';
import type { Timezone } from './types';
import { getLocalTimezone, POPULAR_TIMEZONES } from './utils/timezone';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezones, setSelectedTimezones] = useState<Timezone[]>(() => {
    const localTz = getLocalTimezone();
    const localTimezone = POPULAR_TIMEZONES.find(tz => tz.value === localTz);
    
    if (localTimezone) {
      return [{ ...localTimezone, id: 'local' }];
    } else {
      // Default to New York if local timezone not in popular list
      return [{ ...POPULAR_TIMEZONES[0], id: 'local' }];
    }
  });

  // Update time every minute (table shows hours, not seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleAddTimezone = (timezone: Timezone) => {
    if (!selectedTimezones.find(tz => tz.value === timezone.value)) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    }
  };

  const handleRemoveTimezone = (timezoneId: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.id !== timezoneId));
  };

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

          <div className="add-timezone-section">
            <h2 className="add-timezone-label">Add a timezone</h2>
            <TimezoneSearch 
              onSelect={handleAddTimezone} 
              excludeValues={selectedTimezones.map(tz => tz.value)} 
            />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Works offline • Install as PWA for best experience</p>
      </footer>
    </div>
  );
}

export default App;
