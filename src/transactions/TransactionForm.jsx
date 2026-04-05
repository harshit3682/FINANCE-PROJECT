import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'

const categories = ['Salary','Freelance','Food','Transport','Shopping','Entertainment','Health','Travel','Bills','Other']

export default function TransactionForm({ initial, onClose }) {
  const addTransaction = useStore(s => s.addTransaction)
  const updateTransaction = useStore(s => s.updateTransaction)

  const [form, setForm] = useState(
    initial || { date: '', amount: '', category: 'Food', type: 'expense' }
  )

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const submit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      amount: Number(form.amount),
    }
    if (!payload.date || !payload.amount || !payload.type) return
    if (initial?.id) {
      updateTransaction(initial.id, payload)
    } else {
      addTransaction(payload)
    }
    onClose?.()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Amount</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
          Cancel
        </button>
        <button type="submit" className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white">
          {initial?.id ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  )
}

