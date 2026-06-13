import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface QuicFileDB extends DBSchema {
  users: {
    key: string;
    value: {
      id: string;
      email: string;
      name: string;
      createdAt: number;
    };
  };
  businesses: {
    key: string;
    value: {
      id: string;
      userId: string;
      name: string;
      description?: string;
      createdAt: number;
    };
  };
  files: {
    key: string;
    value: {
      id: string;
      businessId: string;
      name: string;
      type: string;
      size: number;
      createdAt: number;
      updatedAt: number;
      content?: string;
    };
    indexes: { 'by-business': string };
  };
}

let db: IDBPDatabase<QuicFileDB> | null = null;

export async function initializeDatabase(): Promise<IDBPDatabase<QuicFileDB>> {
  if (db) {
    return db;
  }

  db = await openDB<QuicFileDB>('quicfile-db', 1, {
    upgrade(db) {
      // Create users store
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }

      // Create businesses store
      if (!db.objectStoreNames.contains('businesses')) {
        db.createObjectStore('businesses', { keyPath: 'id' });
      }

      // Create files store with index
      if (!db.objectStoreNames.contains('files')) {
        const fileStore = db.createObjectStore('files', { keyPath: 'id' });
        fileStore.createIndex('by-business', 'businessId');
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