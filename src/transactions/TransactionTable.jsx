import { useMemo, useState } from 'react'
import { useStore } from '../store/useStore'
import { applyFilters } from '../utils/calculations'
import TransactionRow from './TransactionRow'
import TransactionFilters from './TransactionFilters'
import TransactionForm from './TransactionForm'

export default function TransactionTable() {
  const role = useStore(s => s.role)
  const transactions = useStore(s => s.transactions)
  const filters = useStore(s => s.filters)

  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => applyFilters(transactions, filters), [transactions, filters])

  const openAdd = () => { setEditing(null); setIsOpen(true) }
  const openEdit = (tx) => { setEditing(tx); setIsOpen(true) }

  return (
    <div className="card card-padding">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
        {role === 'Admin' && (
          <button onClick={openAdd} className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white">
            Add Transaction
          </button>
        )}
      </div>

      <TransactionFilters />

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-3 py-8 text-center text-gray-500 dark:text-gray-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map(tx => (
                <TransactionRow key={tx.id} tx={tx} onEdit={openEdit} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="card card-padding w-full max-w-lg">
            <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {editing ? 'Edit Transaction' : 'Add Transaction'}
            </h4>
            <TransactionForm initial={editing} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

