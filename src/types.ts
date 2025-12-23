export interface Timezone {
  id: string;
  label: string;
  value: string; // IANA timezone identifier
}

export const POPULAR_TIMEZONES: Timezone[] = [
  { id: '1', label: 'New York (EST/EDT)', value: 'America/New_York' },
  { id: '2', label: 'Los Angeles (PST/PDT)', value: 'America/Los_Angeles' },
  { id: '3', label: 'London (GMT/BST)', value: 'Europe/London' },
  { id: '4', label: 'Paris (CET/CEST)', value: 'Europe/Paris' },
  { id: '5', label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
  { id: '6', label: 'Sydney (AEST/AEDT)', value: 'Australia/Sydney' },
  { id: '7', label: 'Dubai (GST)', value: 'Asia/Dubai' },
  { id: '8', label: 'Singapore (SGT)', value: 'Asia/Singapore' },
  { id: '9', label: 'Hong Kong (HKT)', value: 'Asia/Hong_Kong' },
  { id: '10', label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
  { id: '11', label: 'Berlin (CET/CEST)', value: 'Europe/Berlin' },
  { id: '12', label: 'Toronto (EST/EDT)', value: 'America/Toronto' },
  { id: '13', label: 'Chicago (CST/CDT)', value: 'America/Chicago' },
  { id: '14', label: 'Denver (MST/MDT)', value: 'America/Denver' },
  { id: '15', label: 'Mexico City (CST/CDT)', value: 'America/Mexico_City' },
  { id: '16', label: 'São Paulo (BRT/BRST)', value: 'America/Sao_Paulo' },
  { id: '17', label: 'Moscow (MSK)', value: 'Europe/Moscow' },
  { id: '18', label: 'Istanbul (TRT)', value: 'Europe/Istanbul' },
  { id: '19', label: 'Bangkok (ICT)', value: 'Asia/Bangkok' },
  { id: '20', label: 'Seoul (KST)', value: 'Asia/Seoul' },
];
