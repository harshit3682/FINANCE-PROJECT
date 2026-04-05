import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { mockTransactions } from '../data/mockData'

export const useStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'Viewer', // 'Viewer' | 'Admin'
      darkMode: false,
      filters: {
        search: '',
        type: 'all', // all | income | expense
        sortBy: 'date', // date | amount
        sortDir: 'desc', // asc | desc
      },

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [{ ...tx, id: crypto.randomUUID() }, ...state.transactions],
        })),

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      setRole: (role) => set({ role }),
      setDarkMode: (dark) => set({ darkMode: dark }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setFilters: (partial) =>
        set((state) => ({
          filters: { ...state.filters, ...partial },
        })),
    }),
    {
      name: 'finance-dashboard',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        filters: state.filters,
        darkMode: state.darkMode,
      }),
    }
  )
)

