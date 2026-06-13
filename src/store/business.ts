import { create } from 'zustand';

interface Business {
  id: string;
  name: string;
  description?: string;
}

interface BusinessStore {
  businesses: Business[];
  currentBusiness: Business | null;
  addBusiness: (business: Business) => void;
  setCurrentBusiness: (business: Business | null) => void;
  setBusinesses: (businesses: Business[]) => void;
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
}));