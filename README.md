# PWA Timezone Converter

A Progressive Web App for comparing multiple timezones at once. Works completely offline after installation.

## Features

- 🌍 Compare multiple timezones simultaneously
- ⚡ Real-time clock updates
- 📱 Installable as a PWA
- 🔌 Works offline
- 🎨 Modern, responsive design
- 🌙 Dark mode interface

## Tech Stack

- React 19
- TypeScript
- Vite
- PWA (vite-plugin-pwa)
- Day.js for timezone handling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Usage

1. The app starts with your local timezone
2. Use the dropdown to add more timezones
3. Remove timezones by clicking the × button on each card
4. All times update in real-time

## PWA Installation

When running the app, you can install it as a PWA:

- On desktop: Look for the install icon in your browser's address bar
- On mobile: Use the "Add to Home Screen" option in your browser menu

## Offline Support

The app uses service workers to cache all assets, allowing it to work completely offline after the first visit.

## License

MIT
