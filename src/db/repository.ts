import { getDB } from './init'
import type { Product, Customer, Transaction, Invoice, Expense } from '../types'
import { v4 as uuidv4 } from 'uuid'

export class ProductRepository {
  async create(businessId: string, data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const db = await getDB()
    const product: Product = {
      id: uuidv4(),
      businessId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    }
    await db.add('products', product)
    return product
  }

  async findByBarcode(businessId: string, barcode: string) {
    const db = await getDB()
    const allByBusiness = await db.getAllFromIndex(
      'products',
      'by-businessId',
      businessId
    )
    return allByBusiness.find((p) => p.barcode === barcode)
  }

  async getByBusiness(businessId: string) {
    const db = await getDB()
    return db.getAllFromIndex('products', 'by-businessId', businessId)
  }

  async updateStock(productId: string, quantity: number) {
    const db = await getDB()
    const product = await db.get('products', productId)
    if (product) {
      product.stock = quantity
      product.updatedAt = new Date()
      await db.put('products', product)
    }
    return product
  }
}

export class CustomerRepository {
  async create(businessId: string, data: Omit<Customer, 'id' | 'createdAt'>) {
    const db = await getDB()
    const customer: Customer = {
      id: uuidv4(),
      businessId,
      createdAt: new Date(),
      ...data,
    }
    await db.add('customers', customer)
    return customer
  }

  async getByBusiness(businessId: string) {
    const db = await getDB()
    return db.getAllFromIndex('customers', 'by-businessId', businessId)
  }

  async updateBalance(customerId: string, balance: number) {
    const db = await getDB()
    const customer = await db.get('customers', customerId)
    if (customer) {
      customer.balance = balance
      await db.put('customers', customer)
    }
    return customer
  }
}

export class TransactionRepository {
  async create(businessId: string, data: Omit<Transaction, 'id' | 'createdAt'>) {
    const db = await getDB()
    const transaction: Transaction = {
      id: uuidv4(),
      businessId,
      createdAt: new Date(),
      ...data,
    }
    await db.add('transactions', transaction)
    return transaction
  }

  async getByBusiness(businessId: string) {
    const db = await getDB()
    return db.getAllFromIndex('transactions', 'by-businessId', businessId)
  }

  async getTodayTransactions(businessId: string) {
    const db = await getDB()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const transactions = await db.getAllFromIndex(
      'transactions',
      'by-businessId',
      businessId
    )
    return transactions.filter((t) => new Date(t.createdAt) >= today)
  }
}

export class InvoiceRepository {
  async create(businessId: string, data: Omit<Invoice, 'id' | 'createdAt'>) {
    const db = await getDB()
    const invoice: Invoice = {
      id: uuidv4(),
      createdAt: new Date(),
      ...data,
    }
    await db.add('invoices', invoice)
    return invoice
  }

  async getByBusiness(businessId: string) {
    const db = await getDB()
    return db.getAllFromIndex('invoices', 'by-businessId', businessId)
  }
}

export class ExpenseRepository {
  async create(businessId: string, data: Omit<Expense, 'id' | 'createdAt'>) {
    const db = await getDB()
    const expense: Expense = {
      id: uuidv4(),
      createdAt: new Date(),
      ...data,
    }
    await db.add('expenses', expense)
    return expense
  }

  async getByBusiness(businessId: string) {
    const db = await getDB()
    return db.getAllFromIndex('expenses', 'by-businessId', businessId)
  }
}
