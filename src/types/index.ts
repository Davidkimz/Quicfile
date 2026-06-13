// User Types
export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  password: string;
  createdAt: number;
}

// Business Types
export type BusinessType = 'service' | 'shop';
export type EmployeeRole = 'owner' | 'manager' | 'cashier' | 'accountant' | 'viewer';

export interface Business {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: BusinessType;
  logo?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Employee {
  id: string;
  businessId: string;
  userId: string;
  role: EmployeeRole;
  name: string;
  email: string;
  phoneNumber?: string;
  createdAt: number;
}

// Customer/Client Types
export interface Customer {
  id: string;
  businessId: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notes?: string;
  outstandingBalance: number;
  createdAt: number;
  updatedAt: number;
}

// Product/Inventory Types
export interface Product {
  id: string;
  businessId: string;
  name: string;
  barcode?: string;
  sku?: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  lowStockThreshold: number;
  category?: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
}

export interface StockMovement {
  id: string;
  businessId: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason?: string;
  reference?: string; // Transaction or Invoice ID
  createdAt: number;
}

// Transaction Types
export type TransactionType = 'sale' | 'return' | 'expense' | 'payment';
export type PaymentMethod = 'cash' | 'card' | 'check' | 'bank_transfer' | 'mobile_money';
export type TransactionStatus = 'draft' | 'completed' | 'pending_sync' | 'synced';

export interface Transaction {
  id: string;
  businessId: string;
  type: TransactionType;
  status: TransactionStatus;
  customerId?: string; // For invoices
  amount: number;
  tax?: number;
  discount?: number;
  paymentMethod?: PaymentMethod;
  reference?: string;
  notes?: string;
  items: LineItem[];
  createdAt: number;
  updatedAt: number;
  syncedAt?: number;
}

export interface LineItem {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// Invoice Types
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface Invoice {
  id: string;
  businessId: string;
  invoiceNumber: string;
  customerId: string;
  status: InvoiceStatus;
  issueDate: number;
  dueDate: number;
  items: LineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  notes?: string;
  createdAt: number;
  updatedAt: number;
  syncedAt?: number;
}

export interface Payment {
  id: string;
  businessId: string;
  invoiceId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  reference?: string;
  notes?: string;
  createdAt: number;
  syncedAt?: number;
}

// Expense Types
export type ExpenseCategory = 'rent' | 'utilities' | 'salaries' | 'supplies' | 'marketing' | 'other';

export interface Expense {
  id: string;
  businessId: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  paymentMethod?: PaymentMethod;
  receiptImage?: string; // Base64 or file reference
  isRecurring?: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  notes?: string;
  createdAt: number;
  syncedAt?: number;
}

// Sync Types
export type SyncStatus = 'synced' | 'syncing' | 'pending' | 'offline' | 'error';
export type SyncEventType = 
  | 'transaction_created' 
  | 'invoice_created' 
  | 'invoice_updated'
  | 'payment_recorded'
  | 'inventory_updated' 
  | 'expense_added' 
  | 'customer_created' 
  | 'customer_updated'
  | 'product_created'
  | 'product_updated';

export interface SyncEvent {
  id: string;
  businessId: string;
  eventType: SyncEventType;
  entityId: string;
  entityType: string;
  payload: Record<string, any>;
  synced: boolean;
  createdAt: number;
  syncedAt?: number;
}

// Report Types
export interface DashboardMetrics {
  businessId: string;
  todayRevenue: number;
  monthlyRevenue: number;
  outstandingInvoices: number;
  expenseSummary: number;
  lowStockCount: number;
  pendingSyncCount: number;
  syncStatus: SyncStatus;
  lastSyncTime?: number;
}

export interface ProfitAndLossReport {
  businessId: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: number;
  endDate: number;
  totalRevenue: number;
  totalExpenses: number;
  grossProfit: number;
  netProfit: number;
}

export interface SalesReport {
  businessId: string;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: number;
  endDate: number;
  totalSales: number;
  transactionCount: number;
  averageTransactionValue: number;
  topProducts: Array<{ productId: string; productName: string; quantity: number; revenue: number }>;
}

export interface InventoryReport {
  businessId: string;
  totalProducts: number;
  totalValue: number;
  lowStockProducts: Product[];
  outOfStockProducts: Product[];
  fastMovingProducts: Array<{ productId: string; productName: string; moveCount: number }>;
}

export interface CustomerStatement {
  customerId: string;
  businessId: string;
  customerName: string;
  period: { startDate: number; endDate: number };
  transactions: Transaction[];
  invoices: Invoice[];
  totalSales: number;
  outstandingBalance: number;
}
