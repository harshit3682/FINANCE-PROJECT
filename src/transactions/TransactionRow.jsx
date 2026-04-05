import { useStore } from '../store/useStore'

export default function TransactionRow({ tx, onEdit }) {
  const role = useStore(s => s.role)
  const deleteTransaction = useStore(s => s.deleteTransaction)

  const isIncome = tx.type === 'income'

  return (
    <tr className="border-t border-gray-100 dark:border-gray-700">
      <td className="px-3 py-2 text-gray-700 dark:text-gray-200">{tx.date}</td>
      <td className={`px-3 py-2 font-medium ${isIncome ? 'text-income' : 'text-expense'}`}>
        {isIncome ? '+' : '-'}${tx.amount.toLocaleString()}
      </td>
      <td className="px-3 py-2 text-gray-700 dark:text-gray-200">{tx.category}</td>
      <td className="px-3 py-2">
        <span className={`px-2 py-1 rounded text-xs ${isIncome ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800/30 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-300'}`}>
          {tx.type}
        </span>
      </td>
      <td className="px-3 py-2 text-right">
        {role === 'Admin' ? (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(tx)}
              className="px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTransaction(tx.id)}
              className="px-2 py-1 text-xs rounded border border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300"
            >
              Delete
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400">View only</span>
        )}
      </td>
    </tr>
  )
}

