import { create } from 'zustand';
import { Business, BusinessType } from '../types';

interface BusinessStore {
  businesses: Business[];
  currentBusiness: Business | null;
  addBusiness: (business: Business) => void;
  setCurrentBusiness: (business: Business | null) => void;
  setBusinesses: (businesses: Business[]) => void;
  updateBusiness: (business: Business) => void;
}

export const useBusinessStore = create<BusinessStore>((set) => ({
  businesses: [],
  currentBusiness: null,
  addBusiness: (business) =>
    set((state) => ({
      businesses: [...state.businesses, business],
    })),
  setCurrentBusiness: (business) => set({ currentBusiness: business }),
  setBusinesses: (businesses) => set({ businesses }),
  updateBusiness: (business) =>
    set((state) => ({
      businesses: state.businesses.map((b) => (b.id === business.id ? business : b)),
      currentBusiness: state.currentBusiness?.id === business.id ? business : state.currentBusiness,
    })),
}));
