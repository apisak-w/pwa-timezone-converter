import { useState, useEffect, useRef } from 'react';
import { getAllTimezones } from '../utils/timezone';
import './TimezoneSearch.css';

interface TimezoneSearchProps {
  onSelect: (timezone: { label: string; value: string; id: string }) => void;
  excludeValues: string[];
}

export const TimezoneSearch = ({ onSelect, excludeValues }: TimezoneSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ label: string; value: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allTimezones = useRef<{ label: string; value: string }[]>([]);

  useEffect(() => {
    allTimezones.current = getAllTimezones();
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = allTimezones.current
      .filter((tz) => !excludeValues.includes(tz.value))
      .filter((tz) =>
        tz.label.toLowerCase().includes(query.toLowerCase()) ||
        tz.value.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10); // Show top 10 results

    setResults(filtered);
  }, [query, excludeValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (tz: { label: string; value: string }) => {
    // eslint-disable-next-line react-hooks/purity
    const id = `${tz.value}-${Math.random().toString(36).substring(2, 9)}`;
    onSelect({ ...tz, id });
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="timezone-search-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search for a city or timezone..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="timezone-search-input"
        />
        {query && (
          <button className="clear-search" onClick={() => setQuery('')}>
            ×
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="search-results-list">
          {results.map((tz) => (
            <li
              key={tz.value}
              onClick={() => handleSelect(tz)}
              className="search-result-item"
            >
              {tz.label}
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.trim() !== '' && results.length === 0 && (
        <div className="search-no-results">No timezones found.</div>
      )}
    </div>
  );
};
