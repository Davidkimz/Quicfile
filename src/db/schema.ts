import { DBSchema, IDBPDatabase } from 'idb';
import {
  User,
  Business,
  Employee,
  Customer,
  Product,
  StockMovement,
  Transaction,
  Invoice,
  Payment,
  Expense,
  SyncEvent,
} from '../types';

export interface QuicFileDB extends DBSchema {
  users: {
    key: string;
    value: User;
  };
  businesses: {
    key: string;
    value: Business;
    indexes: { 'by-user': string };
  };
  employees: {
    key: string;
    value: Employee;
    indexes: { 'by-business': string; 'by-user': string };
  };
  customers: {
    key: string;
    value: Customer;
    indexes: { 'by-business': string };
  };
  products: {
    key: string;
    value: Product;
    indexes: { 'by-business': string; 'by-barcode': string };
  };
  stock_movements: {
    key: string;
    value: StockMovement;
    indexes: { 'by-business': string; 'by-product': string };
  };
  transactions: {
    key: string;
    value: Transaction;
    indexes: { 'by-business': string; 'by-customer': string; 'by-status': string };
  };
  invoices: {
    key: string;
    value: Invoice;
    indexes: { 'by-business': string; 'by-customer': string; 'by-status': string };
  };
  payments: {
    key: string;
    value: Payment;
    indexes: { 'by-business': string; 'by-invoice': string };
  };
  expenses: {
    key: string;
    value: Expense;
    indexes: { 'by-business': string; 'by-category': string };
  };
  sync_events: {
    key: string;
    value: SyncEvent;
    indexes: { 'by-business': string; 'by-synced': string };
  };
}

export const DB_NAME = 'quicfile-db';
export const DB_VERSION = 1;
