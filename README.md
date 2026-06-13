# QuicFile - Offline-First Business Operating System

Version 4.0 - A complete business management system for sales, invoicing, inventory, and expenses with full offline support.

## Features

- ✅ **Offline-First Architecture** - All data is saved locally first, syncs automatically when online
- ✅ **Progressive Web App** - Install on any device and use like a native app
- ✅ **Multi-Business Support** - Manage multiple businesses under one account
- ✅ **Point of Sale** - Fast checkout with barcode scanning
- ✅ **Inventory Management** - Track products, stock, and pricing
- ✅ **Invoicing** - Create, send, and manage invoices
- ✅ **Expense Tracking** - Record business expenses with receipts
- ✅ **Business Reports** - P&L, sales summary, inventory reports
- ✅ **Real-Time Sync** - Automatic synchronization across devices

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Davidkimz/QuicFile.git
cd QuicFile

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Architecture

### Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand
- **Local Storage**: IndexedDB
- **UI Components**: Lucide React, Tailwind CSS
- **Utilities**: date-fns, uuid

### Project Structure

```
src/
├── components/        # React components
│   ├── auth/         # Authentication flows
│   ├── business/     # Business selection
│   ├── pages/        # Main app pages
│   └── layout/       # Layout components
├── db/               # Database utilities
├── services/         # Business logic
├── store/            # Zustand stores
├── types/            # TypeScript types
└── App.tsx           # Root component
```

## Data Storage

QuicFile uses IndexedDB for local data storage:

- **Users**: User account data
- **Businesses**: Business profiles
- **Products**: Inventory items
- **Customers**: Client information
- **Transactions**: Sales, purchases, expenses
- **Invoices**: Billing documents
- **Expenses**: Cost tracking
- **SyncEvents**: Pending synchronization queue

## Synchronization

The sync engine:

1. Queues events locally when transactions are created
2. Monitors internet connectivity
3. Automatically syncs pending events when online
4. Handles merge conflicts using operational transformation
5. Provides sync status feedback to the user

## Development Workflow

### Running the App

```bash
npm run dev
```

### Type Checking

```bash
npm run type-check
```

### Building

```bash
npm run build
npm run preview
```

## PWA Configuration

The app includes:

- **Service Worker** (`public/sw.js`) - Offline support and caching
- **Manifest** (`public/manifest.json`) - PWA metadata and icons
- **Meta Tags** - Theme colors and viewport configuration

## Features in Development

- [ ] Backend API integration
- [ ] Multi-device sync
- [ ] Payroll module
- [ ] E-commerce integration
- [ ] Tax filing integrations
- [ ] AI business insights
- [ ] Mobile money reconciliation

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions, please create an issue on GitHub.

---

**QuicFile** - Business should continue even when the internet does not.
