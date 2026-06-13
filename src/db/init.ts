import { openDB, IDBPDatabase } from 'idb';
import { QuicFileDB, DB_NAME, DB_VERSION } from './schema';

let db: IDBPDatabase<QuicFileDB> | null = null;

export async function initializeDatabase(): Promise<IDBPDatabase<QuicFileDB>> {
  if (db) {
    return db;
  }

  db = await openDB<QuicFileDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Users store
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }

      // Businesses store
      if (!db.objectStoreNames.contains('businesses')) {
        const businessStore = db.createObjectStore('businesses', { keyPath: 'id' });
        businessStore.createIndex('by-user', 'userId');
      }

      // Employees store
      if (!db.objectStoreNames.contains('employees')) {
        const employeeStore = db.createObjectStore('employees', { keyPath: 'id' });
        employeeStore.createIndex('by-business', 'businessId');
        employeeStore.createIndex('by-user', 'userId');
      }

      // Customers store
      if (!db.objectStoreNames.contains('customers')) {
        const customerStore = db.createObjectStore('customers', { keyPath: 'id' });
        customerStore.createIndex('by-business', 'businessId');
      }

      // Products store
      if (!db.objectStoreNames.contains('products')) {
        const productStore = db.createObjectStore('products', { keyPath: 'id' });
        productStore.createIndex('by-business', 'businessId');
        productStore.createIndex('by-barcode', 'barcode');
      }

      // Stock movements store
      if (!db.objectStoreNames.contains('stock_movements')) {
        const stockStore = db.createObjectStore('stock_movements', { keyPath: 'id' });
        stockStore.createIndex('by-business', 'businessId');
        stockStore.createIndex('by-product', 'productId');
      }

      // Transactions store
      if (!db.objectStoreNames.contains('transactions')) {
        const txnStore = db.createObjectStore('transactions', { keyPath: 'id' });
        txnStore.createIndex('by-business', 'businessId');
        txnStore.createIndex('by-customer', 'customerId');
        txnStore.createIndex('by-status', 'status');
      }

      // Invoices store
      if (!db.objectStoreNames.contains('invoices')) {
        const invoiceStore = db.createObjectStore('invoices', { keyPath: 'id' });
        invoiceStore.createIndex('by-business', 'businessId');
        invoiceStore.createIndex('by-customer', 'customerId');
        invoiceStore.createIndex('by-status', 'status');
      }

      // Payments store
      if (!db.objectStoreNames.contains('payments')) {
        const paymentStore = db.createObjectStore('payments', { keyPath: 'id' });
        paymentStore.createIndex('by-business', 'businessId');
        paymentStore.createIndex('by-invoice', 'invoiceId');
      }

      // Expenses store
      if (!db.objectStoreNames.contains('expenses')) {
        const expenseStore = db.createObjectStore('expenses', { keyPath: 'id' });
        expenseStore.createIndex('by-business', 'businessId');
        expenseStore.createIndex('by-category', 'category');
      }

      // Sync events store
      if (!db.objectStoreNames.contains('sync_events')) {
        const syncStore = db.createObjectStore('sync_events', { keyPath: 'id' });
        syncStore.createIndex('by-business', 'businessId');
        syncStore.createIndex('by-synced', 'synced');
      }
    },
  });

  return db;
}

export async function getDatabase(): Promise<IDBPDatabase<QuicFileDB>> {
  if (!db) {
    return initializeDatabase();
  }
  return db;
}

export async function clearDatabase(): Promise<void> {
  const database = await getDatabase();
  const stores = [
    'sync_events',
    'expenses',
    'payments',
    'invoices',
    'transactions',
    'stock_movements',
    'products',
    'customers',
    'employees',
    'businesses',
    'users',
  ];

  for (const store of stores) {
    await database.clear(store as any);
  }
}
